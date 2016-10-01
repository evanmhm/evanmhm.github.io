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
        console.log("particle init");
        this.update = function(vx, vy, spacingx, spacingy) {
            vx = vx || 0,
                vy = vy || 0;
            this.vx = this.vx;
            this.vy = this.vy;
            this.x = spacingx;
            this.y = (Math.sin(((new Date()).getTime() + this.x) / 270) * 50) + spacingy;
        };
    };

    var ParticleSystem = function(container, count, radius) {
        var ctx = container.getContext('2d');

        count = count || 0;

        this.particles = [];

        // Initialization
        initTime = d.getTime();
        console.log("init");
        for (i = 0; i < count; ++i) {
            var x = (i / count) * container.width,
                y = (i / count) * container.height,
                vx = 0,
                vy = 0
            this.particles.push(new Particle(x, y, radius, vx, vy));
        }
        console.log("pushed particles");
        this.update = function(updatedContainer, spacingy) {
            for (i = 0; i < count; ++i) {
                if (this.particles[i].x < 0 &&
                    this.particles[i].x > updatedContainer.width &&
                    this.particles[i].y < 0 &&
                    this.particles[i].y > updatedContainer.height) {

                    this.particles[i].x = (Math.random() * updatedContainer.width);
                    this.particles[i].y = 0;
                }
                var spacingx = (i / count) * updatedContainer.width;
                this.particles[i].update(0, 0, spacingx, spacingy);
                ctx.fillStyle = "rgba(32, 45, 21, 0.1)";
                ctx.beginPath();
                ctx.arc(this.particles[i].x, this.particles[i].y, this.particles[i].r, 0, Math.PI * 2, false);
                ctx.fill();
            }
        };
    };

    var particleChain = function(amount, canvas, length) {
        this.p = [];
        for (n = 0; n < amount; n += 1) {
            var ps = new ParticleSystem(canvas, Math.round(Math.random() * 4 + length), 6);
            this.p.push(ps);
        }

        this.update = function() {
            for (a = 0; a < this.p.length; a++) {
                var spacingy = (a / amount) * (canvas.width);
                this.p[a].update(canvas, spacingy);
            }
        }
    }

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

        partChain = new particleChain(50, canvas, 15);

        paint();

        function paint() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            canvas.height = containerDiv.offsetHeight;
            canvas.width = containerDiv.clientWidth;
            partChain.update();

            requestAnimFrame(paint);
        }
    }
})();
