Ext.ns('afStudio.dbQuery');

/**
 * QueryForm
 * 
 * @class afStudio.dbQuery.QueryForm
 * @extends Ext.Panel
 * @author Nikolai
 */
afStudio.dbQuery.QueryForm = Ext.extend(Ext.FormPanel, {
	
	/**
	 * @cfg {String} queryUrl required (defaults to 'afsDatabaseQuery/query')
	 * Query URL
	 */
	queryUrl : afStudioWSUrls.dbQueryComplexQueryUrl,
	
	/**
	 * @cfg {afStudio.dbQuery.QueryWindow} (required) dbQueryWindow Parent container window
	 */
	
	/**
	 * Executes Query
	 */
	executeQuery : function() {
		var me = this,
			f = me.getForm(),
			qt = me.queryTypeCmp.getValue(),
	    	connection = this.dbQueryWindow.westPanel.getCurrentConnection(),
			queryParam = Ext.apply(f.getFieldValues(), connection);	    
		
	    if (qt == 'sql' && !connection) {
	    	afStudio.Msg.warning('Connection is not specified. <br /> Please select DataBase or DB\'s table.');
	   		return;
	    }
	    
		me.dbQueryWindow.maskDbQuery();
				
		f.submit({
		    clientValidation: true,
		    url: me.queryUrl,
		    params: {
		    	connection: connection,
		    	start: 0,
		    	limit: afStudio.dbQuery.QueryResultsGrid.prototype.recordsPerPage
		    },
		    success: function(form, action) {
		    	me.dbQueryWindow.unmaskDbQuery();		    	
		    	me.fireEvent('executequery', {
		    		result: action.result,
		    		queryParam: queryParam
	    		});
		    },
		    
		    failure: function(form, action) {
		    	me.dbQueryWindow.unmaskDbQuery();
		    	
		        switch (action.failureType) {
		            case Ext.form.Action.CLIENT_INVALID:
		                afStudio.Msg.info('DBQuery', 'Query text is empty.');
					break;
					
		            case Ext.form.Action.CONNECT_FAILURE:
		                afStudio.Msg.error('DBQuery', 'Ajax communication failed');
		            break;
		            
		            case Ext.form.Action.SERVER_INVALID:
				    	me.fireEvent('executequery', {
				    		result: action.result,
				    		queryParam: queryParam
			    		});		            
		            break;   
		       }
		    }			
		});
	},
	//eo executeQuery
	
	/**
	 * Initializes component
	 * @private
	 * @return {Object} The configuration object 
	 */
	_beforeInitComponent : function() {
		var me = this;
		
		return {
			region: 'north',
			layout: 'form',
			height: 140,
			frame: true,
			iconCls: 'icon-sql', 
			margins: '0 5 5 5', 
			title: 'SQL',
			items: [
			{
				layout: 'column',
				border: false,				
				defaults: {
					border: false
				},
				items: [
				{
					layout: 'form',
					columnWidth: 1,
					style: 'margin-right: 5px;',
					items: {
						xtype: 'combo',
						ref: '../../queryTypeCmp',
						fieldLabel: 'Query type',						
						anchor: '100%',
						triggerAction: 'all',						
						value: 'sql',
						hiddenName: 'type',
						name: 'type',
						store: [['sql', 'sql'], ['propel', 'propel']]				
					}
				},{
					items: {
						xtype: 'button',
						text: 'Query',
						iconCls: 'icon-accept',
						scope: me,
						handler: me.executeQuery
					}
				}]
			},{
				xtype: 'textarea',
				ref: 'queryText',
				enableKeyEvents: true,
				msgTarget: 'qtip',
				allowBlank: false,
				blankText: 'Query field is required',
				hideLabel: true,
				height: 80,
				name: 'query',
				anchor: '100% '
			}]		
		};		
	},
	//eo _beforeInitComponent
	
	/**
	 * Ext Template method
	 * @private
	 */ 
	initComponent : function() {
		Ext.apply(this, 
			Ext.applyIf(this.initialConfig, this._beforeInitComponent())
		);				
		afStudio.dbQuery.QueryForm.superclass.initComponent.apply(this, arguments);
		this._afterInitComponent();
	},
	
	/**
	 * @private
	 */
	_afterInitComponent : function() {
		var me = this;
		
		me.addEvents(
			/**
			 * @event executequery Fires after query was successufully executed
			 * @param {Object} result The query result object:
			 * <ul>
			 * <li><b>meta</b>: The query meta-data.</li>
			 * <li><b>total</b>: The total number of records</li>
			 * <li><b>type</b></li>
			 * <li><b>success</b></li>
			 * </ul>
			 * @param {Object} queryParam The query parameters
			 */
			'executequery'
		);
		
		this.queryText.on({
			scope: this,			
			keydown: this.onQueryFieldKeyDown
		});
	},
	//eo _afterInitComponent
	
	/**
	 * Query text field <u>keydown</u> event listener.
	 * @param {Ext.form.TextField} f The query text field.
	 * @param {Ext.EventObject} e The event object.
	 */
	onQueryFieldKeyDown : function(f, e) {
		if (e.ctrlKey && e.getKey() == Ext.EventObject.ENTER) {
			this.executeQuery();
		}
	}
});

/**
 * @type 'afStudio.dbQuery.queryForm'
 */
Ext.reg('afStudio.dbQuery.queryForm', afStudio.dbQuery.QueryForm);