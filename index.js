var key = require('key-emit')(document);

exports.make = function(THREE) {
    var sensors = [];
    for (var i = 0; i < 10; i++ ) {
        sensors.push(
        {
            controlled: [],
            position: new THREE.Vector3(0, 0, 0),
            orientation: new THREE.Quaternion(),
            scale: new THREE.Vector3(1, 1, 1), 
            offset : new THREE.Vector3(0, 0, 0)
        });
    }
    var tracker = {
        active : 0, 
        sensors : sensors,
        poll: function() {
            this.apply_poll();
        },
        add: function(obj, sensor) {
            sensor = sensor || 0
            this.sensors[sensor].controlled.push(obj);
        },
        remove: function(obj, sensor) {
            sensor = sensor || 0
            this.sensors[sensor].controlled.remove(obj);
        },
        scale : function (sensor, scale) {
            if (scale === undefined ) {
                return this.sensors[sensor].scale;
            }
            else {
                this.sensors[sensor].scale = scale;
            }
        }, 
        offset : function (sensor, offset) {
            if (offset === undefined ) {
                return this.sensors[sensor].offset;
            }
            else {
                this.sensors[sensor].offset = offset;
            }
        },
        active_sensor : function() {
            return this.sensors[this.active];
        },
        apply_poll: function() {
            for (var c = 0; c < 10; c++ ) {
                sensor = this.sensors[c];
                for (var i = 0; i < sensor.controlled.length; i++) {
                    o = sensor.controlled[i];
                    o.position.x = sensor.position.x * sensor.scale.x + sensor.offset.x;
                    o.position.y = sensor.position.y * sensor.scale.y + sensor.offset.y;
                    o.position.z = sensor.position.z * sensor.scale.z + sensor.offset.z;
                    o.quaternion.copy(sensor.orientation);
                }
            }
        }
    }

    var ramount = Math.PI / 2 / 20;
    var make_rotation = function(vector, sign) {
        var quaternion = new THREE.Quaternion();
        quaternion.setFromAxisAngle(vector, sign * Math.PI / 2 / 20);
        return quaternion
    }

    
    key.down.on("0-9", function(sensor){
        tracker.active = sensor;
        console.log("Switched keyboard trackr sensor to " + tracker.active);
    });
    key.down.on("X", function() {
        tracker.active_sensor().position.x += 1;
    });
    key.down.on("x", function() {
        tracker.active_sensor().position.x -= 1;
    });
    key.down.on("Y", function() {
        tracker.active_sensor().position.y += 1;
    });
    key.down.on("y", function() {
        tracker.active_sensor().position.y -= 1;
    });
    key.down.on("Z", function() {
        tracker.active_sensor().position.z += 1;
    });
    key.down.on("z", function() {
        tracker.active_sensor().position.z -= 1;
    });


    key.down.on("left", function() {
        tracker.active_sensor().orientation.multiply(make_rotation(new THREE.Vector3(0, 1, 0), 1));
    });
    key.down.on("right", function() {
        tracker.active_sensor().orientation.multiply(make_rotation(new THREE.Vector3(0, 1, 0), -1));
    });
    key.down.on("up", function() {
        tracker.active_sensor().orientation.multiply(make_rotation(new THREE.Vector3(1, 0, 0), 1));
    });
    key.down.on("down", function() {
        tracker.active_sensor().orientation.multiply(make_rotation(new THREE.Vector3(1, 0, 0), -1));
    });
    key.down.on("<", function() {
        tracker.active_sensor().orientation.multiply(make_rotation(new THREE.Vector3(0, 0, 1), 1));
    });
    key.down.on(">", function() {
        tracker.active_sensor().orientation.multiply(make_rotation(new THREE.Vector3(0, 0, 1), -1));
    });


            

    return tracker;

}
