# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding field 'Drug_Detail.drug_uses'
        db.add_column(u'rx_drug_detail', 'drug_uses',
                      self.gf('django.db.models.fields.TextField')(default=''),
                      keep_default=False)

        # Adding field 'Drug_Detail.drug_warnings'
        db.add_column(u'rx_drug_detail', 'drug_warnings',
                      self.gf('django.db.models.fields.TextField')(default=''),
                      keep_default=False)


    def backwards(self, orm):
        # Deleting field 'Drug_Detail.drug_uses'
        db.delete_column(u'rx_drug_detail', 'drug_uses')

        # Deleting field 'Drug_Detail.drug_warnings'
        db.delete_column(u'rx_drug_detail', 'drug_warnings')


    models = {
        u'rx.drug_detail': {
            'Meta': {'object_name': 'Drug_Detail'},
            'chem_name': ('django.db.models.fields.CharField', [], {'max_length': '250'}),
            'drug_uses': ('django.db.models.fields.TextField', [], {'default': "''"}),
            'drug_warnings': ('django.db.models.fields.TextField', [], {'default': "''"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'rx_prob': ('django.db.models.fields.FloatField', [], {})
        }
    }

    complete_apps = ['rx']