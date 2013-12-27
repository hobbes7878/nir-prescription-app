# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Deleting field 'Drug_Stat.nir_top_quant'
        db.delete_column(u'rx_drug_stat', 'nir_top_quant')

        # Adding field 'Drug_Stat.nir_top_rxs'
        db.add_column(u'rx_drug_stat', 'nir_top_rxs',
                      self.gf('django.db.models.fields.FloatField')(null=True),
                      keep_default=False)


        # Changing field 'Drug_Stat.nir_top_drug'
        db.alter_column(u'rx_drug_stat', 'nir_top_drug', self.gf('django.db.models.fields.CharField')(max_length=250, null=True))

        # Changing field 'Drug_Stat.nir_total_items'
        db.alter_column(u'rx_drug_stat', 'nir_total_items', self.gf('django.db.models.fields.FloatField')(null=True))

        # Changing field 'Drug_Stat.nir_top_present'
        db.alter_column(u'rx_drug_stat', 'nir_top_present', self.gf('django.db.models.fields.CharField')(max_length=250, null=True))

        # Changing field 'Drug_Stat.nir_deprive1_rx_rate'
        db.alter_column(u'rx_drug_stat', 'nir_deprive1_rx_rate', self.gf('django.db.models.fields.FloatField')(null=True))

        # Changing field 'Drug_Stat.nir_total_cost'
        db.alter_column(u'rx_drug_stat', 'nir_total_cost', self.gf('django.db.models.fields.FloatField')(null=True))

        # Changing field 'Drug_Stat.drug_names'
        db.alter_column(u'rx_drug_stat', 'drug_names', self.gf('django.db.models.fields.CharField')(max_length=250, null=True))

        # Changing field 'Drug_Stat.nir_fatalities'
        db.alter_column(u'rx_drug_stat', 'nir_fatalities', self.gf('django.db.models.fields.IntegerField')(null=True))

        # Changing field 'Drug_Stat.nir_deprive2_rx_rate'
        db.alter_column(u'rx_drug_stat', 'nir_deprive2_rx_rate', self.gf('django.db.models.fields.FloatField')(null=True))

        # Changing field 'Drug_Stat.chem_class'
        db.alter_column(u'rx_drug_stat', 'chem_class', self.gf('django.db.models.fields.CharField')(max_length=250, null=True))

        # Changing field 'Drug_Stat.chem_name'
        db.alter_column(u'rx_drug_stat', 'chem_name', self.gf('django.db.models.fields.CharField')(max_length=250, null=True))

        # Changing field 'Drug_Stat.chem_action'
        db.alter_column(u'rx_drug_stat', 'chem_action', self.gf('django.db.models.fields.CharField')(max_length=250, null=True))

        # Changing field 'Drug_Stat.nir_deprive3_rx_rate'
        db.alter_column(u'rx_drug_stat', 'nir_deprive3_rx_rate', self.gf('django.db.models.fields.FloatField')(null=True))

        # Changing field 'Drug_Stat.nir_deprive4_rx_rate'
        db.alter_column(u'rx_drug_stat', 'nir_deprive4_rx_rate', self.gf('django.db.models.fields.FloatField')(null=True))

    def backwards(self, orm):
        # Adding field 'Drug_Stat.nir_top_quant'
        db.add_column(u'rx_drug_stat', 'nir_top_quant',
                      self.gf('django.db.models.fields.FloatField')(default=0),
                      keep_default=False)

        # Deleting field 'Drug_Stat.nir_top_rxs'
        db.delete_column(u'rx_drug_stat', 'nir_top_rxs')


        # Changing field 'Drug_Stat.nir_top_drug'
        db.alter_column(u'rx_drug_stat', 'nir_top_drug', self.gf('django.db.models.fields.CharField')(default='', max_length=250))

        # Changing field 'Drug_Stat.nir_total_items'
        db.alter_column(u'rx_drug_stat', 'nir_total_items', self.gf('django.db.models.fields.FloatField')(default=''))

        # Changing field 'Drug_Stat.nir_top_present'
        db.alter_column(u'rx_drug_stat', 'nir_top_present', self.gf('django.db.models.fields.CharField')(default='', max_length=250))

        # Changing field 'Drug_Stat.nir_deprive1_rx_rate'
        db.alter_column(u'rx_drug_stat', 'nir_deprive1_rx_rate', self.gf('django.db.models.fields.FloatField')(default=''))

        # Changing field 'Drug_Stat.nir_total_cost'
        db.alter_column(u'rx_drug_stat', 'nir_total_cost', self.gf('django.db.models.fields.FloatField')(default=''))

        # Changing field 'Drug_Stat.drug_names'
        db.alter_column(u'rx_drug_stat', 'drug_names', self.gf('django.db.models.fields.CharField')(default='', max_length=250))

        # Changing field 'Drug_Stat.nir_fatalities'
        db.alter_column(u'rx_drug_stat', 'nir_fatalities', self.gf('django.db.models.fields.IntegerField')(default=''))

        # Changing field 'Drug_Stat.nir_deprive2_rx_rate'
        db.alter_column(u'rx_drug_stat', 'nir_deprive2_rx_rate', self.gf('django.db.models.fields.FloatField')(default=''))

        # Changing field 'Drug_Stat.chem_class'
        db.alter_column(u'rx_drug_stat', 'chem_class', self.gf('django.db.models.fields.CharField')(default='', max_length=250))

        # Changing field 'Drug_Stat.chem_name'
        db.alter_column(u'rx_drug_stat', 'chem_name', self.gf('django.db.models.fields.CharField')(default='', max_length=250))

        # Changing field 'Drug_Stat.chem_action'
        db.alter_column(u'rx_drug_stat', 'chem_action', self.gf('django.db.models.fields.CharField')(default='', max_length=250))

        # Changing field 'Drug_Stat.nir_deprive3_rx_rate'
        db.alter_column(u'rx_drug_stat', 'nir_deprive3_rx_rate', self.gf('django.db.models.fields.FloatField')(default=''))

        # Changing field 'Drug_Stat.nir_deprive4_rx_rate'
        db.alter_column(u'rx_drug_stat', 'nir_deprive4_rx_rate', self.gf('django.db.models.fields.FloatField')(default=''))

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
            'nir_top_drug': ('django.db.models.fields.CharField', [], {'max_length': '250', 'null': 'True'}),
            'nir_top_present': ('django.db.models.fields.CharField', [], {'max_length': '250', 'null': 'True'}),
            'nir_top_rxs': ('django.db.models.fields.FloatField', [], {'null': 'True'}),
            'nir_total_cost': ('django.db.models.fields.FloatField', [], {'null': 'True'}),
            'nir_total_items': ('django.db.models.fields.FloatField', [], {'null': 'True'}),
            'significant_dif': ('django.db.models.fields.BooleanField', [], {'default': 'False'})
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
            'cost': ('django.db.models.fields.FloatField', [], {}),
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
            'rx_per_1k': ('django.db.models.fields.FloatField', [], {})
        }
    }

    complete_apps = ['rx']