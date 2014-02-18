if(localStorage['user']){
	$(document).ready(function(){
		$('#tableEmpresas').dataTable({
			"bDestroy": true,	
			sDom: ''		
		});
		$('#tableTrabajadores').dataTable({
			"bDestroy": true,				
			fnDrawCallback: function ( oSettings ) {		
				/* Need to redo the counters if filtered or sorted */
				if ( oSettings.bSorted || oSettings.bFiltered )
				{
					for ( var i=0, iLen=oSettings.aiDisplay.length ; i<iLen ; i++ )
					{
						$('td:eq(0)', oSettings.aoData[ oSettings.aiDisplay[i] ].nTr ).html( i+1 );
					}
				}
			},
			"iDisplayLength": 5,
			"aLengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]]
		});
	})
}
else{
	console.log('no tiene')
	window.location = '../'
}