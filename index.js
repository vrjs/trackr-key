exports.make = function(THREE) {
    var channels = [];
    for (var i = 0; i < 10; i++ ) {
        channels.push(
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
        channels : channels,
        poll: function() {
            this.apply_poll();
        },
        add: function(obj, channel) {
            channel = channel || 0
            this.channels[channel].controlled.push(obj);
        },
        remove: function(obj, channel) {
            channel = channel || 0
            this.channels[channel].controlled.remove(obj);
        },
        handle_key: function(event) {
            if (event.which >= 48 && event.which <= 57) {
                this.active = event.which - 48;
                console.log("Switched keyboard trackr channel to " + this.active);
                return;
            }

            var make_rotation = function(vector, sign) {
                var quaternion = new THREE.Quaternion();
                quaternion.setFromAxisAngle(vector, sign * Math.PI / 2 / 20);
                return quaternion
            }
            var channel = this.channels[this.active];
            var ramount = Math.PI / 2 / 20;

            if (event.which === 88 && event.shiftKey) { // X moves + in x direction
                channel.position.x += 1;
            } else if (event.which === 88) {
                channel.position.x -= 1;
            } else if (event.which === 89 && event.shiftKey) {
                channel.position.y += 1;
            } else if (event.which === 89) {
                channel.position.y -= 1;
            } else if (event.which === 90 && event.shiftKey) {
                channel.position.z += 1;
            } else if (event.which === 90) {
                channel.position.z -= 1;
            } else if (event.which == 72 && event.shiftKey) {
                channel.orientation.multiply(make_rotation(new THREE.Vector3(0, 1, 0), 1));
            } else if (event.which == 72) {
                channel.orientation.multiply(make_rotation(new THREE.Vector3(0, 1, 0), -1));
            } else if (event.which == 74 && event.shiftKey) {
                channel.orientation.multiply(make_rotation(new THREE.Vector3(1, 0, 0), 1));
            } else if (event.which == 74) {
                channel.orientation.multiply(make_rotation(new THREE.Vector3(1, 0, 0), -1));
            } else if (event.which == 78 && event.shiftKey) {
                channel.orientation.multiply(make_rotation(new THREE.Vector3(0, 0, 1), 1));
            } else if (event.which == 78) {
                channel.orientation.multiply(make_rotation(new THREE.Vector3(0, 0, 1), -1));
            }
        },
        apply_poll: function() {
            for (var c = 0; c < 10; c++ ) {
                channel = this.channels[c];
                for (var i = 0; i < channel.controlled.length; i++) {
                    o = channel.controlled[i];
                    o.position.x = channel.position.x * channel.scale.x + channel.offset.x;
                    o.position.y = channel.position.y * channel.scale.y + channel.offset.y;
                    o.position.z = channel.position.z * channel.scale.z + channel.offset.z;
                    o.quaternion.copy(channel.orientation);
                }
            }
        }
    }

    document.addEventListener("keydown", function(e) {
        tracker.handle_key(e)
    });

    return tracker;

}
