# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Deleting field 'TopDrugGPs.rx_per_1k'
        db.delete_column(u'rx_topdruggps', 'rx_per_1k')

        # Deleting field 'TopDrugGPs.cost'
        db.delete_column(u'rx_topdruggps', 'cost')

        # Adding field 'TopDrugGPs.qof'
        db.add_column(u'rx_topdruggps', 'qof',
                      self.gf('django.db.models.fields.FloatField')(default=0.01),
                      keep_default=False)

        # Adding field 'TopDrugGPs.ddd_per_1k'
        db.add_column(u'rx_topdruggps', 'ddd_per_1k',
                      self.gf('django.db.models.fields.FloatField')(default=0.01),
                      keep_default=False)


    def backwards(self, orm):
        # Adding field 'TopDrugGPs.rx_per_1k'
        db.add_column(u'rx_topdruggps', 'rx_per_1k',
                      self.gf('django.db.models.fields.FloatField')(default=0.01),
                      keep_default=False)

        # Adding field 'TopDrugGPs.cost'
        db.add_column(u'rx_topdruggps', 'cost',
                      self.gf('django.db.models.fields.FloatField')(default=0.01),
                      keep_default=False)

        # Deleting field 'TopDrugGPs.qof'
        db.delete_column(u'rx_topdruggps', 'qof')

        # Deleting field 'TopDrugGPs.ddd_per_1k'
        db.delete_column(u'rx_topdruggps', 'ddd_per_1k')


    models = {
        u'rx.drug_detail': {
            'Meta': {'object_name': 'Drug_Detail'},
            'chem_action': ('django.db.models.fields.CharField', [], {'default': 'None', 'max_length': '250', 'null': 'True', 'blank': 'True'}),
            'chem_brand': ('django.db.models.fields.CharField', [], {'default': 'None', 'max_length': '250', 'null': 'True', 'blank': 'True'}),
            'chem_class': ('django.db.models.fields.CharField', [], {'default': 'None', 'max_length': '250', 'null': 'True', 'blank': 'True'}),
            'chem_fatal': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'chem_name': ('django.db.models.fields.CharField', [], {'max_length': '250'}),
            'chem_present': ('django.db.models.fields.CharField', [], {'default': 'None', 'max_length': '250', 'null': 'True', 'blank': 'True'}),
            'chem_strength': ('django.db.models.fields.CharField', [], {'default': 'None', 'max_length': '250', 'null': 'True', 'blank': 'True'}),
            'drug_description': ('django.db.models.fields.TextField', [], {'default': 'None', 'null': 'True', 'blank': 'True'}),
            'drug_uses': ('django.db.models.fields.TextField', [], {'default': 'None', 'null': 'True', 'blank': 'True'}),
            'drug_warnings': ('django.db.models.fields.TextField', [], {'default': 'None', 'null': 'True', 'blank': 'True'}),
            'eng_items': ('django.db.models.fields.FloatField', [], {'default': '0', 'null': 'True'}),
            'eng_items_per': ('django.db.models.fields.FloatField', [], {'default': '0', 'null': 'True'}),
            'eng_patients': ('django.db.models.fields.FloatField', [], {'default': '56042361', 'null': 'True'}),
            'eng_quant': ('django.db.models.fields.FloatField', [], {'default': '0', 'null': 'True'}),
            'eng_quant_per': ('django.db.models.fields.FloatField', [], {'default': '0', 'null': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'items_prob': ('django.db.models.fields.FloatField', [], {'default': '0', 'null': 'True'}),
            'nir_items': ('django.db.models.fields.FloatField', [], {'default': '0', 'null': 'True'}),
            'nir_items_per': ('django.db.models.fields.FloatField', [], {'default': '0', 'null': 'True'}),
            'nir_patients': ('django.db.models.fields.FloatField', [], {'default': '1911002', 'null': 'True'}),
            'nir_quant': ('django.db.models.fields.FloatField', [], {'default': '0', 'null': 'True'}),
            'nir_quant_per': ('django.db.models.fields.FloatField', [], {'default': '0', 'null': 'True'}),
            'raw_presentation': ('django.db.models.fields.CharField', [], {'default': 'None', 'max_length': '250', 'null': 'True', 'blank': 'True'}),
            'rx_prob': ('django.db.models.fields.FloatField', [], {'default': '0', 'null': 'True'})
        },
        u'rx.drug_stat': {
            'Meta': {'object_name': 'Drug_Stat'},
            'chem_action': ('django.db.models.fields.CharField', [], {'max_length': '250', 'null': 'True'}),
            'chem_class': ('django.db.models.fields.CharField', [], {'max_length': '250', 'null': 'True'}),
            'chem_name': ('django.db.models.fields.CharField', [], {'max_length': '250', 'null': 'True'}),
            'defined_daily_dose': ('django.db.models.fields.FloatField', [], {'null': 'True'}),
            'drug_description': ('django.db.models.fields.TextField', [], {'default': 'None', 'null': 'True', 'blank': 'True'}),
            'drug_names': ('django.db.models.fields.CharField', [], {'max_length': '250', 'null': 'True'}),
            'drug_uses': ('django.db.models.fields.TextField', [], {'default': 'None', 'null': 'True', 'blank': 'True'}),
            'drug_warnings': ('django.db.models.fields.TextField', [], {'default': 'None', 'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'nir_deprive1_rx_rate': ('django.db.models.fields.FloatField', [], {'null': 'True'}),
            'nir_deprive2_rx_rate': ('django.db.models.fields.FloatField', [], {'null': 'True'}),
            'nir_deprive3_rx_rate': ('django.db.models.fields.FloatField', [], {'null': 'True'}),
            'nir_deprive4_rx_rate': ('django.db.models.fields.FloatField', [], {'null': 'True'}),
            'nir_fatalities': ('django.db.models.fields.IntegerField', [], {'null': 'True'}),
            'nir_top_amount': ('django.db.models.fields.FloatField', [], {'null': 'True'}),
            'nir_top_drug': ('django.db.models.fields.CharField', [], {'max_length': '250', 'null': 'True'}),
            'nir_top_present': ('django.db.models.fields.CharField', [], {'max_length': '250', 'null': 'True'}),
            'nir_top_rxs': ('django.db.models.fields.FloatField', [], {'null': 'True'}),
            'nir_total_cost': ('django.db.models.fields.FloatField', [], {'null': 'True'}),
            'nir_total_items': ('django.db.models.fields.FloatField', [], {'null': 'True'}),
            'significance': ('django.db.models.fields.FloatField', [], {'default': 'False', 'null': 'True'})
        },
        u'rx.fatal_stat': {
            'Meta': {'object_name': 'Fatal_Stat'},
            'chem_name': ('django.db.models.fields.CharField', [], {'max_length': '250', 'null': 'True'}),
            'f2000': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'f2001': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'f2002': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'f2003': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'f2004': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'f2005': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'f2006': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'f2007': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'f2008': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'f2009': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'f2010': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'f2011': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'f2012': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'})
        },
        u'rx.postgeo': {
            'Meta': {'object_name': 'PostGEO'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'lat': ('django.db.models.fields.FloatField', [], {}),
            'lon': ('django.db.models.fields.FloatField', [], {}),
            'postcode': ('django.db.models.fields.CharField', [], {'max_length': '10'}),
            'postcode_low': ('django.db.models.fields.CharField', [], {'max_length': '10'})
        },
        u'rx.topdruggps': {
            'Meta': {'object_name': 'TopDrugGPs'},
            'add1': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'add2': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'add3': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'chem_name': ('django.db.models.fields.CharField', [], {'max_length': '250'}),
            'code': ('django.db.models.fields.CharField', [], {'max_length': '10'}),
            'ddd_per_1k': ('django.db.models.fields.FloatField', [], {}),
            'deprive': ('django.db.models.fields.CharField', [], {'max_length': '2'}),
            'drug_all_rank': ('django.db.models.fields.IntegerField', [], {}),
            'drug_gp_rank': ('django.db.models.fields.IntegerField', [], {}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'lat': ('django.db.models.fields.FloatField', [], {}),
            'lon': ('django.db.models.fields.FloatField', [], {}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '250'}),
            'patients': ('django.db.models.fields.IntegerField', [], {}),
            'postcode': ('django.db.models.fields.CharField', [], {'max_length': '10'}),
            'prescripts': ('django.db.models.fields.FloatField', [], {}),
            'qof': ('django.db.models.fields.FloatField', [], {})
        }
    }

    complete_apps = ['rx']