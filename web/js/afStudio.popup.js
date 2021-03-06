afStudio.Help = Ext.extend(Ext.Window, { 
	form: null,
	initComponent: function(){
		var config = {
			title: 'Help', 
			width: 990,
			height: 600,
			closable: true,
	        draggable: true, 
	        maximizable: true,
	        plain: true,
	        modal: true, 
	        bodyBorder: false, 
	        border: false,
	        html: String.format('<iframe style="height: 100%; width: 100%;" frameborder=0 src="{0}" id="help-iframe" />', afStudioWSUrls.helpUrl),
			buttons: [
			{
				text: 'Cancel', 
				scope: this,
				handler: this.cancel 
			}],
			buttonAlign: 'center'
		};
				
		// apply config
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		afStudio.Help.superclass.initComponent.apply(this, arguments);	
		this._initEvents();
	},
	
	/**
	 * Function _initEvents
	 * Initialize events
	 */
	_initEvents: function(){
		this.on('show', function(cmp){
			Ext.get('help-iframe').on('load', function(){
				cmp.body.unmask()
			});
		 	(function(){
				 	cmp.body.mask('Loading, please Wait...', 'x-mask-loading');
				 	
		 	}).defer(100);
		})
	},
	
	/**
	 * Function cancel
	 * Closes window
	 */
	cancel:function(){
		this.close();
	}
});

/**
 * AF Studio Welcome window.
 * 
 * @class afStudio.Welcome
 * @extends Ext.Window
 */
afStudio.Welcome = Ext.extend(Ext.Window, { 
    
    /**
     * Ext template method.
     * @override
     * @private
     */
	initComponent : function() {
		var config = {
			title: 'Welcome to AppFlower Studio Beta', 
            width: 810,
            height: 520,
			closable: true,
	        draggable: true, 
            plain:true,
	        modal: true, 
            resizable: false,
	        bodyBorder: false, 
            border: false,
	        html: '<div id="welcome-box" />',
	        buttonAlign: 'left',
	        buttons: [
            { 
                xtype: 'checkbox',
				boxLabel: 'Show this window when Studio opens',
				checked: true,
				handler: function(f, c) {
					if (c) {
					   Ext.util.Cookies.set("appFlowerStudioDontShowWelcomePopup", "");
					} else {
					   Ext.util.Cookies.set("appFlowerStudioDontShowWelcomePopup", "true", new Date('12/22/2099'));
					}
				}
	        }]
		};
				
		Ext.apply(this, Ext.apply(this.initialConfig, config));
        
		afStudio.Welcome.superclass.initComponent.apply(this, arguments);
		
		this.updateWelcomeData();
	},
	
    /**
     * Fetches welcome window data and updates it.
     */
	updateWelcomeData : function() {
		afStudio.xhr.executeAction({
			url: afStudioWSUrls.welcomeWinUrl,
			showNoteOnSuccess: false,
            mask: {cnt: this},
            scope: this,
			run: function(response) {
                if (this.isVisible()) {
	               Ext.get('welcome-box').update(response.data);
	               jQuery("a[rel^='prettyPhoto']").prettyPhoto();
	               setTimeout(function() {jQuery('#studio_video_tours ul').jScrollPane()} , 500); // requred for firefox
                }
			}
		});
	}
});