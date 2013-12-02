# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'GP'
        db.create_table(u'rx_gp', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('gp_name', self.gf('django.db.models.fields.CharField')(max_length=250)),
            ('postcode', self.gf('django.db.models.fields.CharField')(max_length=10)),
            ('patients', self.gf('django.db.models.fields.FloatField')(default=0, null=True)),
            ('chem_name', self.gf('django.db.models.fields.CharField')(max_length=250)),
            ('lat', self.gf('django.db.models.fields.FloatField')()),
            ('lon', self.gf('django.db.models.fields.FloatField')()),
            ('rank', self.gf('django.db.models.fields.IntegerField')()),
            ('items_per', self.gf('django.db.models.fields.FloatField')()),
        ))
        db.send_create_signal(u'rx', ['GP'])


    def backwards(self, orm):
        # Deleting model 'GP'
        db.delete_table(u'rx_gp')


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
        },
        u'rx.gp': {
            'Meta': {'object_name': 'GP'},
            'chem_name': ('django.db.models.fields.CharField', [], {'max_length': '250'}),
            'gp_name': ('django.db.models.fields.CharField', [], {'max_length': '250'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'items_per': ('django.db.models.fields.FloatField', [], {}),
            'lat': ('django.db.models.fields.FloatField', [], {}),
            'lon': ('django.db.models.fields.FloatField', [], {}),
            'patients': ('django.db.models.fields.FloatField', [], {'default': '0', 'null': 'True'}),
            'postcode': ('django.db.models.fields.CharField', [], {'max_length': '10'}),
            'rank': ('django.db.models.fields.IntegerField', [], {})
        }
    }

    complete_apps = ['rx']