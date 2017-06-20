	var app = angular.module('PlaneographApp', []);

	app.controller('PlaneographCtrl',($scope) => {

		$scope.planes = [
			{
				children: []
			},
		];

		$scope.getData = () => {
			$scope.planes = JSON.parse(window.localStorage.notes);
			console.log(window.localStorage.notes);
		};


		$scope.saveData = () => {
			window.localStorage.notes = JSON.stringify($scope.planes);
		};

		if (!window.localStorage.notes) $scope.saveData();

		$scope.getData();

		$scope.downloadData = (linkObj) => {
			var dataStr = 'data:application/json;charset=utf-8,' + encodeURIComponent(window.localStorage.notes);
			linkObj.setAttribute('href',dataStr);
			linkObj.setAttribute('download', 'Planeograph_notes.json');
			linkObj.click();
		};

		$scope.addNtt = (index) => {
			var colors = ['blue','black','green','grey','purple','red lighten-1','pink darken-2','blue-grey','teal'];
			obj = {
				title: 'Lorem ipsum.',
				bgColor: colors[Math.floor(Math.random()*colors.length)],
				fgColor: 'white-text',
				content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia, quidem.',
				images: [
					{src: 'img/sample-1.jpg'}
				],
				tags: ['note']
			}
			$scope.planes[index].children.push(obj);
			$scope.saveData();
		}
	
		$scope.saveNtt = (plane_index,index) => {
			// $scope.planes[plane_index].children[index];
			$scope.planes[plane_index].children[index].title = $('#ntt_'+plane_index+'_'+index+' .card-title').text();
			$scope.planes[plane_index].children[index].content = $('#ntt_'+plane_index+'_'+index+' p.card-content').text();
			$scope.planes[plane_index].children[index].tags = $('#ntt_'+plane_index+'_'+index+' h5').text().split(',');

			$scope.planes[plane_index].children[index]['content'];
			$scope.saveData();
		}

		$scope.deleteNtt = (plane_index,index) => {
			$scope.planes[plane_index].children.splice(index,1);
			$scope.saveData();
		}


		$scope.addImage = (plane_index,index) => {
			var data = prompt('Image\'s URL');
			if (data) {	
				$scope.planes[plane_index].children[index].images.push({src: data});
				$scope.saveData();
			}
		}

		$scope.deleteImage = (plane_index,note_index,index) => {
			$scope.planes[plane_index].children[note_index].images.splice(index,1);
			$scope.saveData();
		}

		$scope.addTags = (plane_index,index) => {
			var tags = prompt('Tags (comma-separated)').split(',');
			if (tags) {
				for (tag of tags) 
					$scope.planes[plane_index].children[index].tags.push(tag);
				$scope.saveData();
			}
		}

		$scope.setColor = (plane_index,index) => {
			$scope.planes[plane_index].children[index].bgColor = prompt('Set the card\'s background color \n see color rules on http://materializecss.com/color.html');
			$scope.planes[plane_index].children[index].fgColor = prompt('Set the card\'s text color \n see color rules on http://materializecss.com/color.html')+'-text';
			$scope.saveData();
		}


		$scope.addPlane = () => {
			$scope.planes.push({children: []});
			$scope.saveData();
		}

		$scope.deletePlane = (index) => {
			$scope.planes.splice(index,1);
			$scope.saveData();
		}



	});

	app.directive("ngFileSelect",($http) => {
		return {
			link: function($scope,el){
				el.bind("change", function(e){
				if (window.File && window.FileReader && window.FileList && window.Blob) {
					var file = e.target.files[0];

					var reader = new FileReader();
					  reader.readAsText(file);
					  reader.onload = function(e) {
					    window.localStorage.notes = String(e.target.result);
					    location.reload();
					  };
				  } else {
				    alert(`Your browser doesn't support FileAPI!`);
				  }
				});
			}
		}
	});
