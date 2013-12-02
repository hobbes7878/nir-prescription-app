from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import render_to_response
from rx.models import Drug_Detail, GP, PostGEO, TopDrugGPs
import operator


def index(request):
	links = Drug_Detail.objects.distinct('chem_name')
	gps = GP.objects.distinct('gp_name')
	gps_list =[]
	links_list=[]
	for gp in gps:
		gps_list.append(gp.gp_name)
	gps_search = '","'.join(str(e) for e in gps_list)
	for ll in links:
		links_list.append(ll.chem_name)
	drug_search = '","'.join(str(e) for e in links_list)

	return render_to_response('rx/index.html', {'links':links, 'gps_search':gps_search, 'drug_search':drug_search, 'search_error':False})

def drug(request, chem):
	links = Drug_Detail.objects.distinct('chem_name')
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
	latlon = []
	for gp in gps:
		latlon.append([gp.lat,gp.lon])
	
	return render_to_response('rx/drug.html',{'chem_name':chem,'links':links, 'drug_detail':drug, 'nir_rx_prob':nir_rx_prob, 'eng_all_rx_per':int(eng_all_rx_per), 'nir_all_rx_per':int(nir_all_rx_per), 'gps':gps, 'latlon':latlon, }) 

def drug_search(request):
	links_list=[]
	links = Drug_Detail.objects.distinct('chem_name')
	for ll in links:
			links_list.append(ll.chem_name.lower())

	if request.GET['q'].lower() in links_list:
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

		gps = GP.objects.filter(chem_name__iexact=request.GET['q']).order_by('rank')
		latlon = []
		for gp in gps:
			latlon.append([gp.lat,gp.lon])
		
		return render_to_response('rx/drug.html',{'chem_name':request.GET['q'],'links':links, 'drug_detail':drug, 'nir_rx_prob':nir_rx_prob, 'eng_all_rx_per':int(eng_all_rx_per), 'nir_all_rx_per':int(nir_all_rx_per), 'gps':gps, 'latlon':latlon, }) 
	
	else:
		gps = GP.objects.distinct('gp_name')
		gps_list =[]
		for gp in gps:
			gps_list.append(gp.gp_name)
		gps_search = '","'.join(str(e) for e in gps_list)
		
		drug_search = '","'.join(str(e) for e in links_list)

		return render_to_response('rx/index.html', {'links':links, 'gps_search':gps_search, 'drug_search':drug_search, 'search_error':True})


def gp_search_name(request):
	links_list=[]
	links = Drug_Detail.objects.distinct('chem_name')
	if request.GET:
		for ll in links:
				links_list.append(ll.chem_name.lower())
		gps = TopDrugGPs.objects.distinct('code').filter(name__icontains=request.GET['q'])
		if gps:
			latlon = []
			for gp in gps:
				latlon.append([gp.lat,gp.lon])
			mapcenter=[]
			if len(latlon)==1:
				mapcenter = latlon[0]
			return render_to_response('rx/gp_search.html', {'gps':gps, 'latlon':latlon, 'mapcenter':mapcenter, 'links':links})
		else:
			if request.META['HTTP_REFERER'][-10:] == 'prescript/':
				gps = GP.objects.distinct('gp_name')
				gps_list =[]
				for gp in gps:
					gps_list.append(gp.gp_name)
				gps_search = '","'.join(str(e) for e in gps_list)
				
				drug_search = '","'.join(str(e) for e in links_list)
				return render_to_response('rx/index.html', {'links':links, 'gps_search':gps_search, 'drug_search':drug_search, 'search_error':True})
			else:
				gps = GP.objects.distinct('gp_name')
				gps_list =[]
				for gp in gps:
					gps_list.append(gp.gp_name)
				gps_search = '","'.join(str(e) for e in gps_list)
			 	return render_to_response('rx/gp_search.html',{'links':links, 'gps_search':gps_search,'search_error':True})
	else:
		gps = GP.objects.distinct('gp_name')
		gps_list =[]
		for gp in gps:
			gps_list.append(gp.gp_name)
		gps_search = '","'.join(str(e) for e in gps_list)
		return render_to_response('rx/gp_search.html',{'links':links, 'gps_search':gps_search,})




def gp_search_area(request):
	links = Drug_Detail.objects.distinct('chem_name')
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

			latlon = []
			for gp in gps:
				latlon.append([gp.lat,gp.lon])		

			return render_to_response('rx/gp_post.html',{'links':links,'gps':gps,'latlon':latlon})
		except:
			return render_to_response('rx/gp_post.html',{'links':links,'search_error':True})
	else: 
		return render_to_response('rx/gp_post.html',{'links':links})



def gp(request,gp_code):
	links = Drug_Detail.objects.distinct('chem_name')
	top_drugs = TopDrugGPs.objects.filter(code=gp_code).order_by('code','drug_gp_rank')
	for td in top_drugs:
	
		#surely there's a better way...
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

	gp_info = top_drugs[0]
	all_gps = len(TopDrugGPs.objects.distinct('code'))
	top_drugs_sorted = sorted(top_drugs, key=operator.attrgetter('deprive_rank'))[:10]

	return render_to_response('rx/gp.html', { 'links':links, 'gp_code':gp_code, 'top_drugs':top_drugs_sorted, 'gp_info':gp_info, 'all_gps':all_gps })







def redirect(request):

	return render_to_response('rx/redirect.html')	
