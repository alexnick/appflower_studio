/**
 * <u>i:params</u> model node.
 * @author Nikolai Babinski <niba@appflower.com>
 */
afStudio.model.Params = Ext.extend(afStudio.model.Node, {

	id : afStudio.ModelNode.PARAMS,
	
	tag : afStudio.ModelNode.PARAMS,
	
	properties : [],
	
	nodeTypes : [
		{name: afStudio.ModelNode.PARAM, required: true, hasMany: true, unique: 'name'}
	]	
});