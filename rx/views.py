from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render_to_response
from django.template import RequestContext
from rx.models import Drug_Detail, PostGEO, TopDrugGPs, Drug_Stat, Fatal_Stat, GPCompare
import operator
import re
import string




######################
## HELPER FUNCTIONS ##
######################

#Top menu drug links
def drug_links():
	links = Drug_Stat.objects.distinct('chem_name','chem_action')
	return links
#GP search name options
def gp_choice():
	gps = TopDrugGPs.objects.distinct('name')
	gps_list =[]
	for gp in gps:
		gps_list.append(gp.name)
	gp_search = '","'.join(str(e) for e in gps_list)
	return gp_search
#Drug seach name options
def drug_choice():
	drugs = Drug_Stat.objects.distinct('chem_name')
	drugs_list=[]
	for dg in drugs:
		drugs_list.append(dg.chem_name)
	drug_search = '","'.join(str(e) for e in drugs_list)
	return drug_search
#latlon list for map
def latlon(gps):
	latlon = []
	for gp in gps:
		latlon.append([gp.lat,gp.lon])
	return latlon
#Regex gets placename from address fields 
def get_city(gps):
	for gp in gps:
		#compiles address, removes puncs and extra spaces
		add =add = ''.join(char for char in (gp.add1 +" "+ gp.add2 +" "+ gp.add3+" "+gp.postcode) if char not in string.punctuation).replace("  "," ").replace("  "," ")


		#removes common street names
		streets = [' street ',' st ',' rd ',' road' ,' ave ',' avenue ', ' estate ']
		for street in streets:
			add = re.sub(r'%s' %street,r' ',add,flags=re.I)
		#removes counties
		address = re.sub(r'(.+ )[Cc][Oo]\.* .+ (BT.+)$',r'\1\2', add)
		#Pull closest placename to Postcode
		gp.city = re.sub(r'.+ ([A-Za-z]+) BT\d.+',r'\1',address)
	return gps

def share_url(request):
	return request.build_absolute_uri()


#https://djangosnippets.org/snippets/1147/
def no_ie(redirect):
    """
    Protects a view from the terror that is Microsoft Internet Explorer
    by redirecting the request to 'redirect'.
    
    Usage:
    
    @no_ie('/ie-compatible-page/')
    def my view(request):
       ...
    
    """
    def view_wrapper(view):
        def dec(request, *args, **kwargs):
        	#Check MSIE version number, too
            if request.META['HTTP_USER_AGENT'].find('MSIE') > 0:
	            if int(re.search(r'MSIE (\d+)\.',request.META['HTTP_USER_AGENT']).group(1)) < 10 :
	                return HttpResponseRedirect(redirect)
            return view(request, *args, **kwargs)
        return dec
    return view_wrapper




###########
## VIEWS ##
###########
@no_ie('/prescript/redirect/')
def index(request):
	return render_to_response('rx/index.html', {'links':drug_links(), 'gps_search':gp_choice(), 'drug_search':drug_choice(), 'search_error':False,'share_url':share_url(request)}, context_instance=RequestContext(request))

@no_ie('/prescript/redirect/')
def drug(request, chem):

	drug_stat = Drug_Stat.objects.filter(chem_name__iexact=chem)[0]

	nir_rx_prob = drug_stat.nir_ddd_per_100k / (drug_stat.nir_ddd_per_100k+drug_stat.eng_ddd_per_100k)

	if chem in [f.chem_name for f in Fatal_Stat.objects.all()]:
		fatal = Fatal_Stat.objects.filter(chem_name__iexact=chem)[0]
		generic = False
	elif drug_stat.chem_action in [f.chem_name for f in Fatal_Stat.objects.all()]:
		fatal = Fatal_Stat.objects.filter(chem_name__iexact=drug_stat.chem_action)[0]
		generic = True
	elif drug_stat.chem_class in [f.chem_name for f in Fatal_Stat.objects.all()]:
		fatal = Fatal_Stat.objects.filter(chem_name__iexact=drug_stat.chem_class)[0]
		generic = True
	else:
		fatal=''
		generic = False

	gps = get_city(TopDrugGPs.objects.filter(chem_name__iexact=chem).order_by('-ddd_per_1k')[:10])
	
	return render_to_response('rx/drug.html',{'share_url':share_url(request),'fatal':fatal, 'generic':generic, 'chem_name':chem,'links':drug_links(), 'nir_rx_prob':nir_rx_prob, 'gps':gps, 'latlon':latlon(gps),'drug_stat':drug_stat,}) 

@no_ie('/prescript/redirect/')
def drug_search(request):
	if request.GET['q'].lower() in [str(e).lower() for e in drug_links()]:


		drug_stat = Drug_Stat.objects.filter(chem_name__iexact=request.GET['q'])[0]

		nir_rx_prob = drug_stat.nir_ddd_per_100k / (drug_stat.nir_ddd_per_100k+drug_stat.eng_ddd_per_100k)

		if request.GET['q'] in [f.chem_name for f in Fatal_Stat.objects.all()]:
			fatal = Fatal_Stat.objects.filter(chem_name__iexact=request.GET['q'])[0]
			generic = False
		elif drug_stat.chem_action in [f.chem_name for f in Fatal_Stat.objects.all()]:
			fatal = Fatal_Stat.objects.filter(chem_name__iexact=drug_stat.chem_action)[0]
			generic = True
		else:
			fatal=''
			generic = False

		gps = get_city(TopDrugGPs.objects.filter(chem_name__iexact=request.GET['q']).order_by('-ddd_per_1k')[:10])

		return render_to_response('rx/drug.html',{'share_url':share_url(request),'fatal':fatal, 'generic':generic, 'chem_name':request.GET['q'],'links':drug_links(), 'nir_rx_prob':nir_rx_prob, 'gps':gps, 'latlon':latlon(gps), 'drug_stat':drug_stat,}) 
	else:
		return render_to_response('rx/index.html', {'share_url':share_url(request),'links':drug_links(), 'gps_search':gp_choice(), 'drug_search':drug_choice(), 'search_error':True})

@no_ie('/prescript/redirect/')
def gp_search_name(request):
	if request.GET:
		gps = get_city(TopDrugGPs.objects.distinct('code').filter(name__icontains=request.GET['q']))
		if gps:
			mapcenter=[]
			if len(latlon(gps))==1:
				mapcenter = latlon(gps)[0]
			return render_to_response('rx/gp_search.html', {'share_url':share_url(request),'gps':gps, 'latlon':latlon(gps), 'mapcenter':mapcenter, 'links':drug_links()})
		else:
			if request.META['HTTP_REFERER'][-10:] == 'prescript/':
				return render_to_response('rx/index.html', {'share_url':share_url(request),'links':drug_links(), 'gps_search':gp_choice(), 'drug_search':drug_choice(), 'search_error':True})
			else:
			 	return render_to_response('rx/gp_search.html',{'share_url':share_url(request),'links':drug_links(), 'gps_search':gp_choice(),'search_error':True})
	else:
		return render_to_response('rx/gp_search.html',{'share_url':share_url(request),'links':drug_links(), 'gps_search':gp_choice(),})



@no_ie('/prescript/redirect/')
def gp_search_area(request):
	if request.GET:
		try:
			post = PostGEO.objects.get(postcode_low__iexact=request.GET['q'].replace(' ',''))
			
			## Haversin formula for distance, closest 10 ##
			gps = get_city(TopDrugGPs.objects.raw(''' SELECT *,
												3956 * 2 * ASIN(SQRT( POW(SIN((%s -
												abs(gps.lat)) * pi()/180 / 2),2) + 
												COS(%s * pi()/180 ) * COS(abs(gps.lat) * 
												pi()/180) * POW(SIN((%s - gps.lon) *  
												pi()/180 / 2), 2) )) as distance
												FROM
													(SELECT DISTINCT id, code, name, postcode, lat, lon, 
														rank() OVER (PARTITION BY code order by id)
													FROM rx_topdruggps) as gps
												where rank = 1
												ORDER BY distance
												''', [post.lat,post.lat,post.lon])[:10]	)

			return render_to_response('rx/gp_post.html',{'share_url':share_url(request),'links':drug_links(),'gps':gps,'latlon':latlon(gps)})
		except:
			return render_to_response('rx/gp_post.html',{'share_url':share_url(request),'links':drug_links(),'search_error':True})
	else: 
		return render_to_response('rx/gp_post.html',{'share_url':share_url(request),'links':drug_links()})


@no_ie('/prescript/redirect/')
def gp(request,gp_code):
	top_drugs = TopDrugGPs.objects.filter(code=gp_code).order_by('code','drug_gp_rank')
	
	try:
		gp_compare = GPCompare.objects.filter(code=gp_code)[0]
	except:
		gp_compare = "NA"

	for td in top_drugs:
		#################################
		#Surely, there's a better way...
		#################################
		rankset = TopDrugGPs.objects.order_by('-rx_per_1k').filter(chem_name=td.chem_name)
		i = 1
		for rank in rankset:
			if rank.code == td.code:
				td.all_rank = i
				i+=1
			else:
				i+=1
		td.all_prescribing_gps = len(rankset)

		rankset = TopDrugGPs.objects.order_by('-rx_per_1k').filter(chem_name=td.chem_name).filter(deprive=td.deprive)
		i = 1
		for rank in rankset:
			if rank.code == td.code:
				td.deprive_rank = i
				i+=1
			else:
				i+=1
		td.deprive_group = len(rankset)
		############################################
		#No, there's not, and don't call me Shirley.
		############################################

	gp_info = top_drugs[0]
	all_gps = len(TopDrugGPs.objects.distinct('code'))
	top_drugs_sorted = top_drugs #sorted(top_drugs, key=operator.attrgetter('deprive_rank'))

	return render_to_response('rx/gp.html', {'share_url':share_url(request), 'links':drug_links(), 'gp_code':gp_code, 'top_drugs':top_drugs_sorted, 'gp_info':gp_info, 'all_gps':all_gps,'gp_compare':gp_compare, })



def redirect(request):
	return render_to_response('rx/redirect.html',{})	

def about(request):
	return render_to_response('rx/about.html',{'links':drug_links(),})
