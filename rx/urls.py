from django.conf.urls import patterns, url

from rx import views

urlpatterns = patterns('rx.views',
    url(r'^$', views.index),
    url(r'^redirect/$', views.redirect),
    url(r'^drugs/$', views.drug_search),
    url(r'^drugs/(?P<chem>.+)/$', views.drug),
    url(r'^gp_search_name/$', views.gp_search_name),
    url(r'^gp_search_area/$', views.gp_search_area),
    url(r'^gps/(?P<gp_code>.+)/$', views.gp),
)