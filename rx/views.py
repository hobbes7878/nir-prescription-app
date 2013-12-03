from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import render_to_response
from rx.models import Drug_Detail, PostGEO, TopDrugGPs
import operator


######################
## HELPER FUNCTIONS ##
######################

#Top menu drug links
def drug_links():
	links = Drug_Detail.objects.distinct('chem_name')
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
	drugs = Drug_Detail.objects.distinct('chem_name')
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


###########
## VIEWS ##
###########

def index(request):
	return render_to_response('rx/index.html', {'links':drug_links(), 'gps_search':gp_choice(), 'drug_search':drug_choice(), 'search_error':False})

def drug(request, chem):
	drug = Drug_Detail.objects.filter(chem_name__iexact=chem)[0]
	prescripts = Drug_Detail.objects.filter(chem_name__iexact=chem)

	nir_all_rx = 0
	eng_all_rx = 0

	for pr in prescripts:
		nir_all_rx += pr.nir_items
		eng_all_rx += pr.eng_items

	eng_all_rx_per = eng_all_rx/(drug.eng_patients/100000)
	nir_all_rx_per = nir_all_rx/(drug.nir_patients/100000)
	nir_rx_prob = nir_all_rx_per / (eng_all_rx_per+nir_all_rx_per)

	gps = TopDrugGPs.objects.filter(chem_name__iexact=chem).order_by('-rx_per_1k')[:10]
	
	return render_to_response('rx/drug.html',{'chem_name':chem,'links':drug_links(), 'drug_detail':drug, 'nir_rx_prob':nir_rx_prob, 'eng_all_rx_per':int(eng_all_rx_per), 'nir_all_rx_per':int(nir_all_rx_per), 'gps':gps, 'latlon':latlon(gps), }) 

def drug_search(request):
	if request.GET['q'].lower() in [str(e).lower() for e in drug_links()]:
		drug = Drug_Detail.objects.filter(chem_name__iexact=request.GET['q'])[0]
		prescripts = Drug_Detail.objects.filter(chem_name__iexact=request.GET['q'])

		nir_all_rx = 0
		eng_all_rx = 0

		for pr in prescripts:
			nir_all_rx += pr.nir_items
			eng_all_rx += pr.eng_items

		eng_all_rx_per = eng_all_rx/(drug.eng_patients/100000)
		nir_all_rx_per = nir_all_rx/(drug.nir_patients/100000)
		nir_rx_prob = nir_all_rx_per / (eng_all_rx_per+nir_all_rx_per)

		gps = TopDrugGPs.objects.filter(chem_name__iexact=request.GET['q']).order_by('-rx_per_1k')[:10]

		return render_to_response('rx/drug.html',{'chem_name':request.GET['q'],'links':drug_links(), 'drug_detail':drug, 'nir_rx_prob':nir_rx_prob, 'eng_all_rx_per':int(eng_all_rx_per), 'nir_all_rx_per':int(nir_all_rx_per), 'gps':gps, 'latlon':latlon(gps), }) 
	else:
		return render_to_response('rx/index.html', {'links':drug_links(), 'gps_search':gp_choice(), 'drug_search':drug_choice(), 'search_error':True})


def gp_search_name(request):
	if request.GET:
		gps = TopDrugGPs.objects.distinct('code').filter(name__icontains=request.GET['q'])
		if gps:
			mapcenter=[]
			if len(latlon(gps))==1:
				mapcenter = latlon(gps)[0]
			return render_to_response('rx/gp_search.html', {'gps':gps, 'latlon':latlon(gps), 'mapcenter':mapcenter, 'links':drug_links()})
		else:
			if request.META['HTTP_REFERER'][-10:] == 'prescript/':
				return render_to_response('rx/index.html', {'links':drug_links(), 'gps_search':gp_choice(), 'drug_search':drug_choice(), 'search_error':True})
			else:
			 	return render_to_response('rx/gp_search.html',{'links':drug_links(), 'gps_search':gp_choice(),'search_error':True})
	else:
		return render_to_response('rx/gp_search.html',{'links':drug_links(), 'gps_search':gp_choice(),})




def gp_search_area(request):
	if request.GET:
		try:
			post = PostGEO.objects.get(postcode_low__iexact=request.GET['q'].replace(' ',''))
			
			## Haversin formula for distance, closest 10 ##
			gps = TopDrugGPs.objects.raw(''' SELECT *,
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
												''', [post.lat,post.lat,post.lon])[:10]	

			return render_to_response('rx/gp_post.html',{'links':drug_links(),'gps':gps,'latlon':latlon(gps)})
		except:
			return render_to_response('rx/gp_post.html',{'links':drug_links(),'search_error':True})
	else: 
		return render_to_response('rx/gp_post.html',{'links':drug_links()})



def gp(request,gp_code):
	top_drugs = TopDrugGPs.objects.filter(code=gp_code).order_by('code','drug_gp_rank')
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
	top_drugs_sorted = sorted(top_drugs, key=operator.attrgetter('deprive_rank'))[:10]

	return render_to_response('rx/gp.html', { 'links':drug_links(), 'gp_code':gp_code, 'top_drugs':top_drugs_sorted, 'gp_info':gp_info, 'all_gps':all_gps })



def redirect(request):
	return render_to_response('rx/redirect.html')	
