# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Deleting field 'Drug_Stat.nir_top_amount'
        db.delete_column(u'rx_drug_stat', 'nir_top_amount')

        # Deleting field 'Drug_Stat.nir_top_drug'
        db.delete_column(u'rx_drug_stat', 'nir_top_drug')

        # Deleting field 'Drug_Stat.defined_daily_dose'
        db.delete_column(u'rx_drug_stat', 'defined_daily_dose')

        # Deleting field 'Drug_Stat.significance'
        db.delete_column(u'rx_drug_stat', 'significance')

        # Deleting field 'Drug_Stat.nir_total_cost'
        db.delete_column(u'rx_drug_stat', 'nir_total_cost')

        # Deleting field 'Drug_Stat.nir_total_items'
        db.delete_column(u'rx_drug_stat', 'nir_total_items')

        # Deleting field 'Drug_Stat.drug_names'
        db.delete_column(u'rx_drug_stat', 'drug_names')

        # Deleting field 'Drug_Stat.nir_fatalities'
        db.delete_column(u'rx_drug_stat', 'nir_fatalities')

        # Adding field 'Drug_Stat.brand_names'
        db.add_column(u'rx_drug_stat', 'brand_names',
                      self.gf('django.db.models.fields.TextField')(default=None, max_length=250, null=True),
                      keep_default=False)

        # Adding field 'Drug_Stat.nir_total_rx'
        db.add_column(u'rx_drug_stat', 'nir_total_rx',
                      self.gf('django.db.models.fields.FloatField')(default=None, null=True),
                      keep_default=False)

        # Adding field 'Drug_Stat.nir_total_ddd'
        db.add_column(u'rx_drug_stat', 'nir_total_ddd',
                      self.gf('django.db.models.fields.FloatField')(default=None, null=True),
                      keep_default=False)

        # Adding field 'Drug_Stat.nir_ddd_per_100k'
        db.add_column(u'rx_drug_stat', 'nir_ddd_per_100k',
                      self.gf('django.db.models.fields.FloatField')(default=None, null=True),
                      keep_default=False)

        # Adding field 'Drug_Stat.eng_ddd_per_100k'
        db.add_column(u'rx_drug_stat', 'eng_ddd_per_100k',
                      self.gf('django.db.models.fields.FloatField')(default=None, null=True),
                      keep_default=False)

        # Adding field 'Drug_Stat.wal_ddd_per_100k'
        db.add_column(u'rx_drug_stat', 'wal_ddd_per_100k',
                      self.gf('django.db.models.fields.FloatField')(default=None, null=True),
                      keep_default=False)

        # Adding field 'Drug_Stat.nir_rx_per_100k'
        db.add_column(u'rx_drug_stat', 'nir_rx_per_100k',
                      self.gf('django.db.models.fields.FloatField')(default=None, null=True),
                      keep_default=False)

        # Adding field 'Drug_Stat.eng_rx_per_100k'
        db.add_column(u'rx_drug_stat', 'eng_rx_per_100k',
                      self.gf('django.db.models.fields.FloatField')(default=None, null=True),
                      keep_default=False)

        # Adding field 'Drug_Stat.wal_rx_per_100k'
        db.add_column(u'rx_drug_stat', 'wal_rx_per_100k',
                      self.gf('django.db.models.fields.FloatField')(default=None, null=True),
                      keep_default=False)

        # Adding field 'Drug_Stat.nir_deprive1_ddd_rate'
        db.add_column(u'rx_drug_stat', 'nir_deprive1_ddd_rate',
                      self.gf('django.db.models.fields.FloatField')(default=None, null=True),
                      keep_default=False)

        # Adding field 'Drug_Stat.nir_deprive2_ddd_rate'
        db.add_column(u'rx_drug_stat', 'nir_deprive2_ddd_rate',
                      self.gf('django.db.models.fields.FloatField')(default=None, null=True),
                      keep_default=False)

        # Adding field 'Drug_Stat.nir_deprive3_ddd_rate'
        db.add_column(u'rx_drug_stat', 'nir_deprive3_ddd_rate',
                      self.gf('django.db.models.fields.FloatField')(default=None, null=True),
                      keep_default=False)

        # Adding field 'Drug_Stat.nir_deprive4_ddd_rate'
        db.add_column(u'rx_drug_stat', 'nir_deprive4_ddd_rate',
                      self.gf('django.db.models.fields.FloatField')(default=None, null=True),
                      keep_default=False)


    def backwards(self, orm):
        # Adding field 'Drug_Stat.nir_top_amount'
        db.add_column(u'rx_drug_stat', 'nir_top_amount',
                      self.gf('django.db.models.fields.FloatField')(null=True),
                      keep_default=False)

        # Adding field 'Drug_Stat.nir_top_drug'
        db.add_column(u'rx_drug_stat', 'nir_top_drug',
                      self.gf('django.db.models.fields.CharField')(max_length=250, null=True),
                      keep_default=False)

        # Adding field 'Drug_Stat.defined_daily_dose'
        db.add_column(u'rx_drug_stat', 'defined_daily_dose',
                      self.gf('django.db.models.fields.FloatField')(null=True),
                      keep_default=False)

        # Adding field 'Drug_Stat.significance'
        db.add_column(u'rx_drug_stat', 'significance',
                      self.gf('django.db.models.fields.FloatField')(default=False, null=True),
                      keep_default=False)

        # Adding field 'Drug_Stat.nir_total_cost'
        db.add_column(u'rx_drug_stat', 'nir_total_cost',
                      self.gf('django.db.models.fields.FloatField')(null=True),
                      keep_default=False)

        # Adding field 'Drug_Stat.nir_total_items'
        db.add_column(u'rx_drug_stat', 'nir_total_items',
                      self.gf('django.db.models.fields.FloatField')(null=True),
                      keep_default=False)

        # Adding field 'Drug_Stat.drug_names'
        db.add_column(u'rx_drug_stat', 'drug_names',
                      self.gf('django.db.models.fields.CharField')(max_length=250, null=True),
                      keep_default=False)

        # Adding field 'Drug_Stat.nir_fatalities'
        db.add_column(u'rx_drug_stat', 'nir_fatalities',
                      self.gf('django.db.models.fields.IntegerField')(null=True),
                      keep_default=False)

        # Deleting field 'Drug_Stat.brand_names'
        db.delete_column(u'rx_drug_stat', 'brand_names')

        # Deleting field 'Drug_Stat.nir_total_rx'
        db.delete_column(u'rx_drug_stat', 'nir_total_rx')

        # Deleting field 'Drug_Stat.nir_total_ddd'
        db.delete_column(u'rx_drug_stat', 'nir_total_ddd')

        # Deleting field 'Drug_Stat.nir_ddd_per_100k'
        db.delete_column(u'rx_drug_stat', 'nir_ddd_per_100k')

        # Deleting field 'Drug_Stat.eng_ddd_per_100k'
        db.delete_column(u'rx_drug_stat', 'eng_ddd_per_100k')

        # Deleting field 'Drug_Stat.wal_ddd_per_100k'
        db.delete_column(u'rx_drug_stat', 'wal_ddd_per_100k')

        # Deleting field 'Drug_Stat.nir_rx_per_100k'
        db.delete_column(u'rx_drug_stat', 'nir_rx_per_100k')

        # Deleting field 'Drug_Stat.eng_rx_per_100k'
        db.delete_column(u'rx_drug_stat', 'eng_rx_per_100k')

        # Deleting field 'Drug_Stat.wal_rx_per_100k'
        db.delete_column(u'rx_drug_stat', 'wal_rx_per_100k')

        # Deleting field 'Drug_Stat.nir_deprive1_ddd_rate'
        db.delete_column(u'rx_drug_stat', 'nir_deprive1_ddd_rate')

        # Deleting field 'Drug_Stat.nir_deprive2_ddd_rate'
        db.delete_column(u'rx_drug_stat', 'nir_deprive2_ddd_rate')

        # Deleting field 'Drug_Stat.nir_deprive3_ddd_rate'
        db.delete_column(u'rx_drug_stat', 'nir_deprive3_ddd_rate')

        # Deleting field 'Drug_Stat.nir_deprive4_ddd_rate'
        db.delete_column(u'rx_drug_stat', 'nir_deprive4_ddd_rate')


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
            'brand_names': ('django.db.models.fields.TextField', [], {'default': 'None', 'max_length': '250', 'null': 'True'}),
            'chem_action': ('django.db.models.fields.CharField', [], {'default': 'None', 'max_length': '250', 'null': 'True'}),
            'chem_class': ('django.db.models.fields.CharField', [], {'default': 'None', 'max_length': '250', 'null': 'True'}),
            'chem_name': ('django.db.models.fields.CharField', [], {'default': 'None', 'max_length': '250', 'null': 'True'}),
            'drug_description': ('django.db.models.fields.TextField', [], {'default': 'None', 'null': 'True', 'blank': 'True'}),
            'drug_uses': ('django.db.models.fields.TextField', [], {'default': 'None', 'null': 'True', 'blank': 'True'}),
            'drug_warnings': ('django.db.models.fields.TextField', [], {'default': 'None', 'null': 'True', 'blank': 'True'}),
            'eng_ddd_per_100k': ('django.db.models.fields.FloatField', [], {'default': 'None', 'null': 'True'}),
            'eng_rx_per_100k': ('django.db.models.fields.FloatField', [], {'default': 'None', 'null': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'nir_ddd_per_100k': ('django.db.models.fields.FloatField', [], {'default': 'None', 'null': 'True'}),
            'nir_deprive1_ddd_rate': ('django.db.models.fields.FloatField', [], {'default': 'None', 'null': 'True'}),
            'nir_deprive1_rx_rate': ('django.db.models.fields.FloatField', [], {'default': 'None', 'null': 'True'}),
            'nir_deprive2_ddd_rate': ('django.db.models.fields.FloatField', [], {'default': 'None', 'null': 'True'}),
            'nir_deprive2_rx_rate': ('django.db.models.fields.FloatField', [], {'default': 'None', 'null': 'True'}),
            'nir_deprive3_ddd_rate': ('django.db.models.fields.FloatField', [], {'default': 'None', 'null': 'True'}),
            'nir_deprive3_rx_rate': ('django.db.models.fields.FloatField', [], {'default': 'None', 'null': 'True'}),
            'nir_deprive4_ddd_rate': ('django.db.models.fields.FloatField', [], {'default': 'None', 'null': 'True'}),
            'nir_deprive4_rx_rate': ('django.db.models.fields.FloatField', [], {'default': 'None', 'null': 'True'}),
            'nir_rx_per_100k': ('django.db.models.fields.FloatField', [], {'default': 'None', 'null': 'True'}),
            'nir_top_present': ('django.db.models.fields.CharField', [], {'default': 'None', 'max_length': '250', 'null': 'True'}),
            'nir_top_rxs': ('django.db.models.fields.FloatField', [], {'default': 'None', 'null': 'True'}),
            'nir_total_ddd': ('django.db.models.fields.FloatField', [], {'default': 'None', 'null': 'True'}),
            'nir_total_rx': ('django.db.models.fields.FloatField', [], {'default': 'None', 'null': 'True'}),
            'wal_ddd_per_100k': ('django.db.models.fields.FloatField', [], {'default': 'None', 'null': 'True'}),
            'wal_rx_per_100k': ('django.db.models.fields.FloatField', [], {'default': 'None', 'null': 'True'})
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
            'action': ('django.db.models.fields.CharField', [], {'max_length': '250'}),
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
            'qof': ('django.db.models.fields.FloatField', [], {}),
            'rx_per_1k': ('django.db.models.fields.FloatField', [], {})
        }
    }

    complete_apps = ['rx']