from django.db import models

# Create your models here.
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

class GP(models.Model):
	gp_name = models.CharField(max_length=250)
	postcode = models.CharField(max_length=10)
	patients = models.FloatField(null=True, default=0)
	chem_name = models.CharField(max_length=250)
	lat = models.FloatField()
	lon = models.FloatField()
	rank = models.IntegerField()
	items_per = models.FloatField()
	def __unicode__(self):
		return self.chem_name + " - "+self.gp_name


class PostGEO(models.Model):
	postcode = models.CharField(max_length=10)
	postcode_low = models.CharField(max_length=10)
	lat = models.FloatField()
	lon = models.FloatField()
	def __unicode__(self):
		return self.postcode

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
	drug_gp_rank = models.IntegerField()
	drug_all_rank = models.IntegerField()
	chem_name = models.CharField(max_length=250)
	prescripts = models.FloatField()
	cost = models.FloatField()
	rx_per_1k = models.FloatField()
	def __unicode__(self):
		return self.code + "-" + self.name + "-" + self.chem_name

