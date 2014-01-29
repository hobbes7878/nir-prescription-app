from django import template
from django.template.defaultfilters import stringfilter
import re
import math
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

@register.filter
def sigdig(value, digits = 3):
	if value == 0:
		return 0
	else:
	    order = int(math.floor(math.log10(math.fabs(value))))
	    places = digits - order - 1
	    if places > 0:
	        fmtstr = "%%.%df" % (places)
	    else:
	        fmtstr = "%.0f"
	    return fmtstr % (round(value, places))