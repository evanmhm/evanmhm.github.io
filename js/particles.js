(function() {
var d = new Date();
var initTime;
    var Particle = function(x, y, r, vx, vy) {
        this.x = x || 0;
        this.y = y || 0;
        this.r = r || 0;
        this.vx = vx || 0;
        this.vy = vy || 0;
        this.rand = Math.random();

        this.update = function(vx, vy, spacing) {
            vx = vx || 0,
                vy = vy || 0;
            this.vx = this.vx;
            this.vy = this.vy;
            this.y = (Math.cos(((new Date()).getTime() + this.x) / 180) * 50) + 50;
        };
    };

    var ParticleSystem = function(container, center, count, radius) {
        var ctx = container.getContext('2d');

        count = count || 0;

        this.particles = [];

        this.center = {
            x: center.x || 0,
            y: center.y || 0
        };

        // Initialization
        initTime = d.getTime();
        for (i = 0; i < count; ++i) {
            var x = (i / count) * container.width,
                y = (i / count) * container.height,
                vx = 0,
                vy = 0
            this.particles.push(new Particle(x, y, radius, vx, vy));
        }

        var particleChain (amount, canvas, length) {
          var p = []
          for(i = 0; i <= amount; i++){
            p.push(new ParticleSystem(canvas, {
                  x: canvas.width / 2,
                  y: canvas.height / 2
              }, 100, 6));
          }
        }

        this.update = function() {
            for (i = 0; i < count; ++i) {
                if (this.particles[i].x < 0 &&
                    this.particles[i].x > container.width &&
                    this.particles[i].y < 0 &&
                    this.particles[i].y > container.height) {

                    this.particles[i].x = (Math.random() * container.width);
                    this.particles[i].y = 0;
                }
                this.particles[i].update();
                ctx.fillStyle = "rgba(32, 45, 21, 0.3)";
                ctx.beginPath();
                ctx.arc(this.particles[i].x, this.particles[i].y, this.particles[i].r, 0, Math.PI * 2, false);
                ctx.fill();
            }
        };
    };

    window.requestAnimFrame = (function() {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    // Call the init() function on load
    document.addEventListener('DOMContentLoaded', init);

    function init() {
        var canvas = document.getElementsByTagName('canvas')[0],
            ctx = canvas.getContext('2d'),
            p = null;
        var containerDiv = document.getElementById('particles');

        canvas.height = containerDiv.offsetHeight;
        canvas.width = containerDiv.clientWidth;

        partChain = new particleChain(10, canvas, 25);

        paint();

        function paint() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            canvas.height = containerDiv.offsetHeight;
            canvas.width = containerDiv.clientWidth;
            p.update();

            requestAnimFrame(paint);
        }
    }
})();
