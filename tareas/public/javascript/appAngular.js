/**
 * Created by Jimmy Rodriguez on 05/01/2016.
 */

angular.module('appTareas',['ui.router'])
    .config(function($stateProvider,$urlRouterProvider){

            $stateProvider
                .state('alta',{
                    url: '/alta',
                    templateUrl: '../views/alta.html',
                    controller: 'ctrlAlta'
                })


                .state('editar',{
                    url: '/editar',
                    templateUrl: '../views/editar.html',
                    controller: 'ctrlEditar'
                });

            $urlRouterProvider.otherwise('alta');

        }
    )

    //este ofrece un servicio de persistencia de datos para que cuando se recargue el navegados los datos se encuentren disponibles
    .factory('comun',function() {

        var comun = {}

        comun.tareas = [{
            nombre: 'comprar comida',
            prioridad: '1'
        }, {
            nombre: 'Pasear al perro',
            prioridad: '2'
        }, {
            nombre: 'ir al cine',
            prioridad: '0'
        }]

        //variable que servira para que pueda utilizar la informacion de boton editar
        comun.tarea = {};


          //aqui inicia la funcion eliminar
         comun.eliminar = function(tarea){

         var indice = comun.tareas.indexOf(tarea);
         comun.tareas.splice(indice,1);

         }//aqui finaliza la funcion eliminar



        return comun;

    })


    .controller('ctrlAlta',function($scope,$state, comun){

        $scope.tarea = {}
        //$scope.tareas = [];
        $scope.tareas = comun.tareas;

        $scope.prioridades = ['Baja','Normal','Alta'];

        $scope.agregar = function(){
            $scope.tareas.push({
                nombre: $scope.tarea.nombre,
                prioridad: parseInt($scope.tarea.prioridad)

            })
        }

        $scope.masPrioridad = function(tarea){

            tarea.prioridad += 1;

        }

        $scope.menosPrioridad = function(tarea){

            tarea.prioridad -= 1;

        }

        $scope.eliminarAlta = function(tarea){

           /* var indice = $scope.tareas.indexOf(tarea);
            $scope.tareas.splice(indice,1);
            */
            comun.eliminar(tarea);

        }

        $scope.procesaObjeto = function(tarea){

            comun.tarea = tarea;
            $state.go('editar');
        }
    })

    .controller('ctrlEditar',function($scope,$state,comun){
        $scope.tarea = comun.tarea;

        $scope.actualizarEdit = function(){
            var indice = comun.tareas.indexOf(comun.tarea);
            comun.tareas[indice] = $scope.tarea;
            $state.go('alta');

        }

        $scope.eliminarEdit = function(){
            comun.eliminar($scope.tarea);
            $state.go('alta');

        }


    })


