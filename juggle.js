const juggle = new Phaser.Game(800, 600, Phaser.CANVAS, '', {
    preload: preload,
    create: create,
    update: update
})

let platforms
let player
let bananas
let score = 0

function preload() {
    juggle.load.image('ground', 'assets/platform.png')
    juggle.load.image('banana', 'assets/banana.png')
    juggle.load.spritesheet('monkey', 'assets/monkey.png', 32, 32)
}
function create() {
    juggle.physics.startSystem(Phaser.Physics.ARCADE)

    platforms = juggle.add.group()
    platforms.enableBody = true

    let ground = platforms.create(0, juggle.world.height - 64, 'ground')
    ground.scale.setTo(2,2)
    ground.body.immovable = true

    let ledge = platforms.create(400, 450, 'ground')
    ledge.body.immovable = true

    ledge = platforms.create(-75, 370, 'ground')
    ledge.body.immovable = true

    ledge = platforms.create(200, 280, 'ground')
    ledge.body.immovable = true

    player = juggle.add.sprite(32, juggle.world.height - 150, 'monkey')
    juggle.physics.arcade.enable(player)

    player.body.bounce.y = 0.2
    player.body.gravity.y = 800
    player.body.collideWorldBounds = true

    player.animations.add('left', [0, 1], 10, true)
    player.animations.add('right', [2, 3], 10, true)

    bananas = juggle.add.group()
    bananas.enableBody = true

    for(var i = 0; i < 12; i ++) {
        let banana = bananas.create(i * 70, 0, 'banana')
        banana.body.gravity.y = 1000
        banana.body.bounce.y = 0.3 + Math.random() * 0.2
    }

    scoreText = juggle.add.text(16, 16, '', { fontSize: '32px', fill: '#FFFF00' })
    cursors = juggle.input.keyboard.createCursorKeys()

}
function update() {
    juggle.physics.arcade.collide(player, platforms)
    juggle.physics.arcade.collide(bananas, platforms)
    juggle.physics.arcade.overlap(player, bananas, collectBanana, null, this)
    player.body.velocity.x = 0

    if(cursors.left.isDown) {
        player.body.velocity.x = -150
        player.animations.play('left')
    } else if(cursors.right.isDown) {
        player.body.velocity.x = 150
        player.animations.play('right')
    } else {
        player.animations.stop()
    }

    if(cursors.up.isDown && player.body.touching.down) {
        player.body.velocity.y = -400
    }

    if(score === 120) {
        alert("You are the winner !!")
        score = 0
        window.location.reload()
    }

}
 
function collectBanana(player, banana) {
    banana.kill()
    score += 10
    scoreText.text = 'Score: ' + score
}