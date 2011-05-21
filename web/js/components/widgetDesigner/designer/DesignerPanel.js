Ext.namespace('afStudio.wd');

/**
 * DesignerPanel
 * Container of WD GUI part.
 * 
 * @class afStudio.wd.DesignerPanel
 * @extends Ext.Panel
 * @author Nikolai
 */
afStudio.wd.DesignerPanel = Ext.extend(Ext.Panel, {
	
	/**
	 * @cfg {String} layout (sets to 'fit')
	 */
	layout : 'fit'
	
	/**
	 * Widget meta data object:
	 * <u>
	 *   <li><b>actionPath</b>: Path to widget's action controller.</li>
	 *   <li><b>securityPath</b>: Path to widget's security config.</li>
	 *   <li><b>widgetUri</b>: Widget URI</li>
	 *   <li><b>definition</b>: Widget's metadata definition.</li>
	 * </ul>
	 * @cfg {Object} widgetMeta
	 */	
	
	/**
	 * Initializes component
	 * @private
	 * @return {Object} The configuration object 
	 */
	,_beforeInitComponent : function() {
		var _this = this,
			   gf = afStudio.wd.GuiFactory;
				
		var gui = gf.buildGui(this.widgetMeta);
		
		var topBarItems = [
			{
				text: 'Save',
				itemId: 'saveBtn',
				iconCls: 'icon-save'
			},'-',{
				text: 'Preview', 
				itemId: 'previewBtn',
				iconCls: 'icon-preview' 
			}
		];		
		Ext.flatten(topBarItems.splice(2, 0, gui.controls));		
		
		return {
			border: true,
			bodyStyle: 'padding: 4px;',
			tbar: {
				items: topBarItems
			},
			items: [
				gui.view
			]
		};
	}//eo _beforeInitComponent	
	
	/**
	 * ExtJS template method
	 * @private
	 */
	,initComponent : function() {
		Ext.apply(this, 
			Ext.apply(this.initialConfig, this._beforeInitComponent())
		);		
		afStudio.wd.DesignerPanel.superclass.initComponent.apply(this, arguments);
		this._afterInitComponent();
	}//eo initComponent	

	/**
	 * Initializes events & does post configuration
	 * @private
	 */	
	,_afterInitComponent : function() {
		/*
		this.on({
			scope: this,
			
			afterrender: function() {
				console.log('afterrender');
				var gf = afStudio.wd.GuiFactory,
					widgetType = gf.getWidgetType(this.widgetMeta);
				if (widgetType != gf.LIST) {
					this.appEngineRenderView(this.widgetMeta.widgetUri);
				}		
				
			}
		});
		*/
	}
	
	/**
	 * Returns designer GUI view component.
	 * @return {Ext.Container} view
	 */
	,getDesignerView : function() {
		return this.items.itemAt(0);
	}//eo getDesignerView
	
	/**
	 * Returns top toolbar item.
	 * @param {String} item The itemId property  
	 * @return {Ext.Toolbar.Item} top toolbar item
	 */
	,getMenuItem : function(item) {		
		return this.getTopToolbar().getComponent(item);
	}//eo getMenuItem
	
	
	,appEngineRenderView : function(view) {	
		var _this = this,
			   vd = this.getDesignerView();
		
		view = view.replace(location.protocol + '//' + location.host + afApp.urlPrefix, '');
		
		var uri = view.split('#');
		uri[0] = uri[0] || '/';
		var futureTab  = uri[1] ? '#' + uri[1] : '',
			futureHash = uri[0] + futureTab,
			maskEl = _this.el;			
		
		afApp.initLoadingProgress(vd.el);
		
		Ext.Ajax.request( {
			url: afApp.urlPrefix + uri[0],
			method: "GET",		
			params : {
				widget_popup_request : true
			},
			success: function(xhr) {
				var json = Ext.util.JSON.decode(xhr.responseText);
								
				if (json.success === false) {
					afStudio.Msg.error(json.message);
					return;
				}	
		
				if (json.redirect && json.message && json.load) {
					afStudio.Msg.error(json.message);
				} else {
					
					var total_addons = new Array();					
					if (json.addons && json.addons.js) {
						for (var i = 0; i < json.addons.js.length; i++) {
							var addon = json.addons.js[i];
							if (!in_array(addon, GLOBAL_JS_VAR) && addon != null) {
								total_addons.push(addon);
							}
						}
					}					
					if (json.addons && json.addons.css) {
						for (var i = 0; i < json.addons.css.length; i++) {
							var addon = json.addons.css[i];
							if (!in_array(addon, GLOBAL_CSS_VAR) && addon != null) {
								total_addons.push(addon);
							}
						}
					}					
	
					var counter = 0,
						backup = new Array(),
						finish;
						
					var load = function() {	
						if (counter >= total_addons.length) {
							finish();
							return;
						}
						afApp.loadingProgress(maskEl, (counter + 1) / total_addons.length);
						var nextAddon = total_addons[counter++];
						
						afApp.createAddon(nextAddon, false, load);
					};

					finish = function() {
						eval(json.source);						
						var backendWinConfig = eval(json.winConfig);										
						var center_panel = (function(){ return eval(json.center_panel); })();
						
						Ext.applyIf(backendWinConfig, {
							autoScroll: true,
							frame: false,
							border: false,
							items: center_panel
						});						
						
						var win = new Ext.Panel(backendWinConfig);						
						
						win.on("render", function(win){ eval(json.public_source); }, null, {single:true});
						
						afApp.loadingProgress(maskEl, 1);
						
						_this.removeAll(true);
						_this.add(win);
						_this.doLayout();						
					}
				
					load();
				}
			},
			failure : function(response) {
				var msg =  'Unable to load the content: ' +
					response.status + ' ' + response.statusText;
				afStudio.Msg.error(msg);
			}
		});		
	}//eo appEngineRenderView
	
	
});


/**
 * @type 'afStudio.wd.designerPanel'
 */
Ext.reg('afStudio.wd.designerPanel', afStudio.wd.DesignerPanel);