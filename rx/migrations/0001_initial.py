# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'Drug_Detail'
        db.create_table(u'rx_drug_detail', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('chem_name', self.gf('django.db.models.fields.CharField')(max_length=250)),
            ('rx_prob', self.gf('django.db.models.fields.FloatField')()),
        ))
        db.send_create_signal(u'rx', ['Drug_Detail'])


    def backwards(self, orm):
        # Deleting model 'Drug_Detail'
        db.delete_table(u'rx_drug_detail')


    models = {
        u'rx.drug_detail': {
            'Meta': {'object_name': 'Drug_Detail'},
            'chem_name': ('django.db.models.fields.CharField', [], {'max_length': '250'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'rx_prob': ('django.db.models.fields.FloatField', [], {})
        }
    }

    complete_apps = ['rx']