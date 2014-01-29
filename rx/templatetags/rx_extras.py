from django import template
from django.template.defaultfilters import stringfilter
import re
from rx.models import TopDrugGPs

register = template.Library()

@register.filter
def percentize(value):
	return int(value * 100)

@register.filter(is_safe=True)
@stringfilter
def mcCap(value):
	return re.sub(r'( Mc)([a-z])', lambda match: match.group(1) + match.group(2).upper(), value)

@register.filter(is_safe=True)
@stringfilter
def drdr(value):
	return value


@register.filter
def monthly(value):
	months=6
	return value/months

@register.filter
def per_nir_gps(value):
	all_nir_gps = 349
	return value/all_nir_gps