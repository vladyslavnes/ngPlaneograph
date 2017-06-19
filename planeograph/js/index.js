	var app = angular.module('PlaneographApp', []);

	app.controller('PlaneographCtrl',($scope,$http) => {

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
		$scope.getData();

		$scope.downloadData = (linkObj) => {
			var dataStr = 'data:application/json;charset=utf-8,' + encodeURIComponent(window.localStorage.notes);
			linkObj.setAttribute('href',dataStr);
			linkObj.setAttribute('download', 'Planeograph_notes.json');
			linkObj.click();
		};

		$scope.addNtt = (index) => {
			var colors = ['blue white-text','white','green white-text','grey white-text','purple white-text','red lighten-1 white-text','pink darken-2','blue-grey white-text','teal white-text'];
			obj = {
				title: 'Lorem ipsum.',
				color: colors[Math.round(Math.random()*colors.length)],
				content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia, quidem.',
				images: [
					{src: 'img/sample-1.jpg'}
				],
				tags: []
			}
			$scope.planes[index].children.push(obj);
			$scope.saveData();
		}
	
		$scope.saveNtt = (plane_index,index) => {
			// $scope.planes[plane_index].children[index];
			$scope.planes[plane_index].children[index].title = $('#ntt_'+plane_index+'_'+index+' .card-title').text();
			$scope.planes[plane_index].children[index].content = $('#ntt_'+plane_index+'_'+index+' p').text();

			$scope.planes[plane_index].children[index]['content'];
			$scope.saveData();
		}

		$scope.deleteNtt = (plane_index,index) => {
			$scope.planes[plane_index].children.splice(index,1);
			$scope.saveData();
		}


		$scope.addImage = (plane_index,index) => {
			$scope.planes[plane_index].children[index].images.push({src: prompt('Image\'s URL')}); // $sce.trustAsResourceUrl
			$scope.saveData();
		}

		$scope.setColor = (plane_index,index) => {
			$scope.planes[plane_index].children[index].color = prompt('Set the card\'s color \n see color rules on http://materializecss.com/color.html');
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