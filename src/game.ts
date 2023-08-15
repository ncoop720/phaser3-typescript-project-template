import * as Phaser from 'phaser'

let player
let click

function preload() {
  this.load.image("background", "assets/background.png")
  this.load.image("test1", "assets/test.png")
}

function create() {
  const background = this.add.image(0, 0, "background")
  background.setOrigin(0, 0)

  player = this.physics.add.sprite(500, 500, "test1")

  this.cameras.main.setBounds(0, 0, background.displayWidth, background.displayHeight)
  this.cameras.main.startFollow(player)

  click = new Phaser.Math.Vector2()

  // handle mouse button
  this.input.on('pointerup', pointer => {
    click.x = pointer.worldX
    click.y = pointer.worldY
    this.physics.moveToObject(player, click, 100)
  })
}

function update() {
  // stop player if it reaches click destination
  if (Phaser.Math.Distance.Between(player.x, player.y, click.x, click.y) < 2) {
    player.body.reset(click.x, click.y)
  }
}

new Phaser.Game({
  type: Phaser.AUTO,
  physics: { default: 'arcade' },
  width: 800,
  height: 600,
  backgroundColor: '#FFFFFF',
  scene: { preload, create, update }
})
