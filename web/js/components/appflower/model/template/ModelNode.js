Ext.ns('afStudio.model.template');

N = afStudio.model.template;

/**
 * 
 * @type
 * @author Nikolai Babinski
 */
N.ModelNode = {
	
	TITLE : 'i:title',
	
	DESCRIPTION : 'i:description',
	
	MENU : 'i:menu',
	
	SCRIPTS : 'i:scripts',
	
	CONFIRM : 'i:confirm',

	FIELDS : 'i:fields',
	
	FIELD : 'i:field',
	
	COLUMN : 'i:column',
	
	BUTTON : 'i:button',
	
	LINK : 'i:link',
	
	RADIO_GROUP : 'i:radiogroup',
	
	IF : 'i:if',
	
	ACTIONS : 'i:actions',
	
	ALTERNATE_DESCRIPTIONS : 'i:alternateDescriptions',
	
	GROUPING : 'i:grouping',
	
	PARAMS : 'i:params',
	
	PROXY : 'i:proxy',
	
	DATA_SOURCE : 'i:datasource',

	DATA_STORE : 'i:datastore',
	
	DISPLAY : 'i:display',
	
	ROW_ACTIONS : 'i:rowactions',
	
	ACTIONS : 'i:actions',
	
	MORE_ACTIONS : 'i:moreactions',
	
	CACHE : 'i:cache',

	AREA : 'i:area',
	
	WIDGET_CATEGORIES : 'i:widgetCategories',
	
	EXTRA_HELP : 'i:extrahelp',
	
	OPTIONS : 'i:options'
};

//shortcut
afStudio.ModelNode = N.ModelNode;

delete N;