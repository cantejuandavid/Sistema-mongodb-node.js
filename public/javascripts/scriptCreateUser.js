$(document).on('ready', function(){
	$('#createUser').submit(function(e){
		e.preventDefault()
		var user = $('#user').val(),
			pass = $('#pass').val(),
			name = $('#name').val(),
			ced = $('#ced').val(),
			tipo = $('#tipo').val(),
			jefe = $('#jefe').val();

		if(user!=''&&pass!=''&&name!=''&&ced!=''&&tipo!=''&&jefe!=''){
			$.ajax({
				type: 'POST',
				url: '/createUser',
				data: {
					user:user,
					pass:pass,
					name:name,
					ced:ced,
					tipo:tipo,
					jefe:jefe
				},
				success: function(c){		
					if(c=='existe'){
						$('#alert').html('Usuario ya existe').show()
					}
					else{
						window.location = "../";
						alert('usuario creado')
					}
				}
			})
		}
		else
			$('#alert').html('Todos los campos son necesarios').show()		
	})
})