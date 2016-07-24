angular.module('saltAir').controller('saltController', function($scope, $http, $timeout, $ionicModal, Projects, $ionicSideMenuDelegate) {

  console.log('salt ctrl loaded');

  // A utility function for creating a new project
  // with the given projectTitle
  var createProject = function(projectTitle) {
    var newProject = Projects.newProject(projectTitle);
    $scope.projects.push(newProject);
    Projects.save($scope.projects);
    $scope.selectProject(newProject, $scope.projects.length-1);
  }

  $http({
    method: 'GET',
    url: 'http://localhost:3000'
  }).then(function successCallback(response) {
    console.log(response);
    $scope.data = response.data;
    // this callback will be called asynchronously
    // when the response is available
  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });

  // Load or initialize projects
  $scope.projects = Projects.all();

  // Grab the last active, or the first project
  $scope.activeProject = $scope.projects[Projects.getLastActiveIndex()];

  // Called to create a new project
  $scope.newProject = function() {
    var projectTitle = prompt('Project name');
    if(projectTitle) {
      createProject(projectTitle);
    }
  };

  // Called to select the given project
  $scope.selectProject = function(project, index) {
    $scope.activeProject = project;
    Projects.setLastActiveIndex(index);
    $ionicSideMenuDelegate.toggleLeft(false);
  };

  // Create our modal
  $ionicModal.fromTemplateUrl('new-task.html', function(modal) {
    $scope.taskModal = modal;
  }, {
    scope: $scope
  });

  $scope.createTask = function(task) {
    if(!$scope.activeProject || !task) {
      return;
    }
    $scope.activeProject.tasks.push({
      title: task.title
    });
    $scope.taskModal.hide();

    // Inefficient, but save all the projects
    Projects.save($scope.projects);

    task.title = "";
  };

  $scope.deleteTask = function(task) {

    $scope.activeProject.tasks.forEach(function(current) {
      if (current === task) {
        $scope.activeProject.tasks.splice($scope.activeProject.tasks.indexOf(current), 1);
        return;
      }
      console.log('couldn\'t find task idyat');
    });
  }

  $scope.deleteProject = function(project) {
    $scope.projects.splice($scope.projects.indexOf(project), 1);
    Projects.save($scope.projects);
    $scope.activeProject = ($scope.projects) ? $scope.projects[0] : '';
  }

  $scope.newTask = function() {
    $scope.taskModal.show();
  };

  $scope.closeNewTask = function() {
    $scope.taskModal.hide();
  }

  $scope.toggleProjects = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };

  // Try to create the first project, make sure to defer
  // this by using $timeout so everything is initialized
  // properly
  // $timeout(function() {
  //   if($scope.projects.length == 0) {
  //     while(true) {
  //       var projectTitle = prompt('Your first project title:');
  //       if(projectTitle) {
  //         createProject(projectTitle);
  //         break;
  //       }
  //     }
  //   }
  // }, 1000);
})
