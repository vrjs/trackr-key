exports.make = function (THREE) {
    var tracker =  {
        controlled : [], 
        position : new THREE.Vector3( 0, 0, 0 ), 
        orientation : new THREE.Quaternion(), 
        scale : new THREE.Vector3(1, 1, 1),

        poll : function(){
            this.apply_poll();
        },
        add : function(obj) {
            this.controlled.push(obj);
        },
        remove : function(obj) {
            this.controlled.remove(obj);
        }, 
        handle_key : function (event) {
            var make_rotation = function(vector, sign){
                var quaternion = new THREE.Quaternion();
                quaternion.setFromAxisAngle( vector, sign * Math.PI / 2 / 20);
                return quaternion
            }
            var ramount = Math.PI / 2 / 20;
                    if (event.which === 88 && event.shiftKey) { // X moves + in x direction
                        this.position.x += 1;
                    } else if (event.which === 88) {
                        this.position.x -= 1;
                    } else if (event.which === 89 && event.shiftKey) { 
                        this.position.y += 1;
                    } else if (event.which === 89) {
                        this.position.y -= 1;
                    } else if (event.which === 90 && event.shiftKey) { 
                        this.position.z += 1;
                    } else if (event.which === 90) {
                        this.position.z -= 1;
                    } else if (event.which == 72 && event.shiftKey){
                        this.orientation.multiply(make_rotation(new THREE.Vector3( 0, 1, 0 ), 1));
                    } else if (event.which == 72 ){
                        this.orientation.multiply(make_rotation(new THREE.Vector3( 0, 1, 0 ), -1));
                    }
                    else if (event.which == 74 && event.shiftKey){
                        this.orientation.multiply(make_rotation(new THREE.Vector3( 1, 0, 0 ), 1));
                    } else if (event.which == 74 ){
                        this.orientation.multiply(make_rotation(new THREE.Vector3( 1, 0, 0 ), -1));
                    }
                    else if (event.which == 78 && event.shiftKey){
                        this.orientation.multiply(make_rotation(new THREE.Vector3( 0, 0, 1 ), 1));
                    } else if (event.which == 78 ){
                        this.orientation.multiply(make_rotation(new THREE.Vector3( 0, 0, 1 ), -1));
                    }
                }, 
                apply_poll : function () {
                    for (var i = 0; i < this.controlled.length; i++ ) {
                        o = this.controlled[i];
                        o.position.x = this.position.x * this.scale.x;
                        o.position.y = this.position.y * this.scale.y;
                        o.position.z = this.position.z * this.scale.z;
                        o.quaternion.copy(this.orientation);
                    }
                }
            }

            document.addEventListener("keydown", function(e){
                tracker.handle_key(e)
            });

            return tracker;

        }