# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding field 'Drug_Detail.chem_class'
        db.add_column(u'rx_drug_detail', 'chem_class',
                      self.gf('django.db.models.fields.CharField')(default=None, max_length=250, null=True),
                      keep_default=False)

        # Adding field 'Drug_Detail.chem_action'
        db.add_column(u'rx_drug_detail', 'chem_action',
                      self.gf('django.db.models.fields.CharField')(default=None, max_length=250, null=True),
                      keep_default=False)

        # Adding field 'Drug_Detail.chem_present'
        db.add_column(u'rx_drug_detail', 'chem_present',
                      self.gf('django.db.models.fields.CharField')(default=None, max_length=250, null=True),
                      keep_default=False)

        # Adding field 'Drug_Detail.chem_strength'
        db.add_column(u'rx_drug_detail', 'chem_strength',
                      self.gf('django.db.models.fields.CharField')(default=None, max_length=250, null=True),
                      keep_default=False)

        # Adding field 'Drug_Detail.chem_brand'
        db.add_column(u'rx_drug_detail', 'chem_brand',
                      self.gf('django.db.models.fields.CharField')(default=None, max_length=250, null=True),
                      keep_default=False)

        # Adding field 'Drug_Detail.chem_fatal'
        db.add_column(u'rx_drug_detail', 'chem_fatal',
                      self.gf('django.db.models.fields.BooleanField')(default=False),
                      keep_default=False)

        # Adding field 'Drug_Detail.eng_items'
        db.add_column(u'rx_drug_detail', 'eng_items',
                      self.gf('django.db.models.fields.FloatField')(default=0, null=True),
                      keep_default=False)

        # Adding field 'Drug_Detail.nir_items'
        db.add_column(u'rx_drug_detail', 'nir_items',
                      self.gf('django.db.models.fields.FloatField')(default=0, null=True),
                      keep_default=False)

        # Adding field 'Drug_Detail.eng_quant'
        db.add_column(u'rx_drug_detail', 'eng_quant',
                      self.gf('django.db.models.fields.FloatField')(default=0, null=True),
                      keep_default=False)

        # Adding field 'Drug_Detail.nir_quant'
        db.add_column(u'rx_drug_detail', 'nir_quant',
                      self.gf('django.db.models.fields.FloatField')(default=0, null=True),
                      keep_default=False)

        # Adding field 'Drug_Detail.eng_patients'
        db.add_column(u'rx_drug_detail', 'eng_patients',
                      self.gf('django.db.models.fields.FloatField')(default=56042361, null=True),
                      keep_default=False)

        # Adding field 'Drug_Detail.nir_patients'
        db.add_column(u'rx_drug_detail', 'nir_patients',
                      self.gf('django.db.models.fields.FloatField')(default=1911002, null=True),
                      keep_default=False)

        # Adding field 'Drug_Detail.nir_items_per'
        db.add_column(u'rx_drug_detail', 'nir_items_per',
                      self.gf('django.db.models.fields.FloatField')(default=0, null=True),
                      keep_default=False)

        # Adding field 'Drug_Detail.eng_items_per'
        db.add_column(u'rx_drug_detail', 'eng_items_per',
                      self.gf('django.db.models.fields.FloatField')(default=0, null=True),
                      keep_default=False)

        # Adding field 'Drug_Detail.nir_quant_per'
        db.add_column(u'rx_drug_detail', 'nir_quant_per',
                      self.gf('django.db.models.fields.FloatField')(default=0, null=True),
                      keep_default=False)

        # Adding field 'Drug_Detail.eng_quant_per'
        db.add_column(u'rx_drug_detail', 'eng_quant_per',
                      self.gf('django.db.models.fields.FloatField')(default=0, null=True),
                      keep_default=False)

        # Adding field 'Drug_Detail.items_prob'
        db.add_column(u'rx_drug_detail', 'items_prob',
                      self.gf('django.db.models.fields.FloatField')(default=0, null=True),
                      keep_default=False)


        # Changing field 'Drug_Detail.drug_uses'
        db.alter_column(u'rx_drug_detail', 'drug_uses', self.gf('django.db.models.fields.TextField')(null=True))

        # Changing field 'Drug_Detail.rx_prob'
        db.alter_column(u'rx_drug_detail', 'rx_prob', self.gf('django.db.models.fields.FloatField')(null=True))

        # Changing field 'Drug_Detail.drug_warnings'
        db.alter_column(u'rx_drug_detail', 'drug_warnings', self.gf('django.db.models.fields.TextField')(null=True))

    def backwards(self, orm):
        # Deleting field 'Drug_Detail.chem_class'
        db.delete_column(u'rx_drug_detail', 'chem_class')

        # Deleting field 'Drug_Detail.chem_action'
        db.delete_column(u'rx_drug_detail', 'chem_action')

        # Deleting field 'Drug_Detail.chem_present'
        db.delete_column(u'rx_drug_detail', 'chem_present')

        # Deleting field 'Drug_Detail.chem_strength'
        db.delete_column(u'rx_drug_detail', 'chem_strength')

        # Deleting field 'Drug_Detail.chem_brand'
        db.delete_column(u'rx_drug_detail', 'chem_brand')

        # Deleting field 'Drug_Detail.chem_fatal'
        db.delete_column(u'rx_drug_detail', 'chem_fatal')

        # Deleting field 'Drug_Detail.eng_items'
        db.delete_column(u'rx_drug_detail', 'eng_items')

        # Deleting field 'Drug_Detail.nir_items'
        db.delete_column(u'rx_drug_detail', 'nir_items')

        # Deleting field 'Drug_Detail.eng_quant'
        db.delete_column(u'rx_drug_detail', 'eng_quant')

        # Deleting field 'Drug_Detail.nir_quant'
        db.delete_column(u'rx_drug_detail', 'nir_quant')

        # Deleting field 'Drug_Detail.eng_patients'
        db.delete_column(u'rx_drug_detail', 'eng_patients')

        # Deleting field 'Drug_Detail.nir_patients'
        db.delete_column(u'rx_drug_detail', 'nir_patients')

        # Deleting field 'Drug_Detail.nir_items_per'
        db.delete_column(u'rx_drug_detail', 'nir_items_per')

        # Deleting field 'Drug_Detail.eng_items_per'
        db.delete_column(u'rx_drug_detail', 'eng_items_per')

        # Deleting field 'Drug_Detail.nir_quant_per'
        db.delete_column(u'rx_drug_detail', 'nir_quant_per')

        # Deleting field 'Drug_Detail.eng_quant_per'
        db.delete_column(u'rx_drug_detail', 'eng_quant_per')

        # Deleting field 'Drug_Detail.items_prob'
        db.delete_column(u'rx_drug_detail', 'items_prob')


        # Changing field 'Drug_Detail.drug_uses'
        db.alter_column(u'rx_drug_detail', 'drug_uses', self.gf('django.db.models.fields.TextField')())

        # Changing field 'Drug_Detail.rx_prob'
        db.alter_column(u'rx_drug_detail', 'rx_prob', self.gf('django.db.models.fields.FloatField')(default=0))

        # Changing field 'Drug_Detail.drug_warnings'
        db.alter_column(u'rx_drug_detail', 'drug_warnings', self.gf('django.db.models.fields.TextField')())

    models = {
        u'rx.drug_detail': {
            'Meta': {'object_name': 'Drug_Detail'},
            'chem_action': ('django.db.models.fields.CharField', [], {'default': 'None', 'max_length': '250', 'null': 'True'}),
            'chem_brand': ('django.db.models.fields.CharField', [], {'default': 'None', 'max_length': '250', 'null': 'True'}),
            'chem_class': ('django.db.models.fields.CharField', [], {'default': 'None', 'max_length': '250', 'null': 'True'}),
            'chem_fatal': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'chem_name': ('django.db.models.fields.CharField', [], {'max_length': '250'}),
            'chem_present': ('django.db.models.fields.CharField', [], {'default': 'None', 'max_length': '250', 'null': 'True'}),
            'chem_strength': ('django.db.models.fields.CharField', [], {'default': 'None', 'max_length': '250', 'null': 'True'}),
            'drug_uses': ('django.db.models.fields.TextField', [], {'default': 'None', 'null': 'True'}),
            'drug_warnings': ('django.db.models.fields.TextField', [], {'default': 'None', 'null': 'True'}),
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
            'rx_prob': ('django.db.models.fields.FloatField', [], {'default': '0', 'null': 'True'})
        }
    }

    complete_apps = ['rx']