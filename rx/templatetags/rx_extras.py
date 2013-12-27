from django import template
from django.template.defaultfilters import stringfilter
import re

register = template.Library()

@register.filter
def percentize(value):
	return int(value * 100)

@register.filter(is_safe=True)
@stringfilter
def mcCap(value):
	return re.sub(r'( Mc)([a-z])', lambda match: match.group(1) + match.group(2).upper(), value)

@register.filter
def monthly(value):
	months=3
	return int(value/months)