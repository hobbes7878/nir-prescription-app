from django.db import models


#DEPRECATED!!! 
class Drug_Detail(models.Model):
	chem_name = models.CharField(max_length=250)
	chem_class = models.CharField(blank=True, null=True, default=None, max_length=250)
	chem_action = models.CharField(blank=True, null=True, default=None, max_length=250)
	raw_presentation = models.CharField(blank=True, null=True, default=None, max_length=250)
	chem_present = models.CharField(blank=True, null=True, default=None, max_length=250)
	chem_strength = models.CharField(blank=True, null=True, default=None, max_length=250)
	chem_brand = models.CharField(blank=True, null=True, default=None, max_length=250)
	chem_fatal = models.BooleanField(default=False)
	eng_items = models.FloatField(null=True, default=0)
	nir_items = models.FloatField(null=True, default=0)
	eng_quant = models.FloatField(null=True, default=0)
	nir_quant = models.FloatField(null=True, default=0)
	eng_patients = models.FloatField(null=True, default=56042361)
	nir_patients = models.FloatField(null=True, default=1911002)
	nir_items_per = models.FloatField(null=True, default=0)
	eng_items_per = models.FloatField(null=True, default=0)
	nir_quant_per = models.FloatField(null=True, default=0)
	eng_quant_per = models.FloatField(null=True, default=0)
	rx_prob = models.FloatField(null=True, default=0)
	items_prob = models.FloatField(null=True, default=0)
	drug_description = models.TextField(blank=True, null=True, default=None)
	drug_uses = models.TextField(blank=True, null=True, default=None)
	drug_warnings = models.TextField(blank=True, null=True, default=None)
	def __unicode__(self):
		return self.chem_name

#Postcode for poorman's geocode
class PostGEO(models.Model):
	postcode = models.CharField(max_length=10)
	postcode_low = models.CharField(max_length=10)
	lat = models.FloatField()
	lon = models.FloatField()
	def __unicode__(self):
		return self.postcode

#only NIR GPs for GP page
class TopDrugGPs(models.Model):
	code = models.CharField(max_length=10)
	name = models.CharField(max_length=250)
	add1 = models.CharField(max_length=255)
	add2 = models.CharField(max_length=255)
	add3 = models.CharField(max_length=255)
	postcode = models.CharField(max_length=10)
	lat = models.FloatField()
	lon = models.FloatField()
	deprive = models.CharField(max_length=2)
	patients = models.IntegerField()
	drug_gp_rank = models.IntegerField() #DDD rank
	drug_all_rank = models.IntegerField() #DDD rank
	chem_name = models.CharField(max_length=250)
	action = models.CharField(max_length=250)
	prescripts = models.FloatField()
	qof = models.FloatField()
	ddd_per_1k = models.FloatField() #already per month..
	rx_per_1k = models.FloatField()
	def __unicode__(self):
		return self.code + "-" + self.name + "-" + self.chem_name




class Drug_Stat(models.Model):
	#CHEM INFO
	chem_name = models.CharField(max_length=250, null=True,default=None)
	chem_class = models.CharField(max_length=250, null=True,default=None)
	chem_action = models.CharField(max_length=250, null=True,default=None)

	#Manual Fill
	brand_names = models.TextField(max_length=250, null=True,default=None)
	drug_description = models.TextField(blank=True, null=True, default=None)
	drug_uses = models.TextField(blank=True, null=True, default=None)
	drug_warnings = models.TextField(blank=True, null=True, default=None)

	#NIR RAW TOTALS
	nir_total_rx = models.FloatField(null=True,default=None)
	nir_total_ddd = models.FloatField(null=True,default=None)

	#NIR TOP PRESENTATION
	nir_top_present = models.CharField(max_length=250, null=True,default=None)
	nir_top_rxs = models.FloatField(null=True,default=None)

	#COMPARATIVE RATES
	#Totals
	nir_ddd_per_100k = models.FloatField(null=True,default=None)
	eng_ddd_per_100k = models.FloatField(null=True,default=None)
	wal_ddd_per_100k = models.FloatField(null=True,default=None)
	nir_rx_per_100k = models.FloatField(null=True,default=None)
	eng_rx_per_100k = models.FloatField(null=True,default=None)
	wal_rx_per_100k = models.FloatField(null=True,default=None)
	#Deprivation
	nir_deprive1_rx_rate = models.FloatField(null=True,default=None)
	nir_deprive2_rx_rate = models.FloatField(null=True,default=None)
	nir_deprive3_rx_rate = models.FloatField(null=True,default=None)
	nir_deprive4_rx_rate = models.FloatField(null=True,default=None)
	nir_deprive1_ddd_rate = models.FloatField(null=True,default=None)
	nir_deprive2_ddd_rate = models.FloatField(null=True,default=None)
	nir_deprive3_ddd_rate = models.FloatField(null=True,default=None)
	nir_deprive4_ddd_rate = models.FloatField(null=True,default=None)
	
	def __unicode__(self):
		return self.chem_name

class Fatal_Stat(models.Model):
	chem_name = models.CharField(max_length=250, null=True)
	f2000 = models.FloatField(null=True,blank=True)
	f2001 = models.FloatField(null=True,blank=True)
	f2002 = models.FloatField(null=True,blank=True)
	f2003 = models.FloatField(null=True,blank=True)
	f2004 = models.FloatField(null=True,blank=True)
	f2005 = models.FloatField(null=True,blank=True)
	f2006 = models.FloatField(null=True,blank=True)
	f2007 = models.FloatField(null=True,blank=True)
	f2008 = models.FloatField(null=True,blank=True)
	f2009 = models.FloatField(null=True,blank=True)
	f2010 = models.FloatField(null=True,blank=True)
	f2011 = models.FloatField(null=True,blank=True)
	f2012 = models.FloatField(null=True,blank=True)
	def __unicode__(self):
		return self.chem_name
