import * as Phaser from 'phaser'

let testSprite1
let click

function preload() {
  this.load.image("test1", "assets/test.png")
}

function create() {
  testSprite1 = this.physics.add.sprite(50, 50, "test1")
  click = new Phaser.Math.Vector2()

  this.input.on('pointerup', pointer => {
    click.x = pointer.x
    click.y = pointer.y
    this.physics.moveToObject(testSprite1, click, 200)
  })
}

function update() {
  if (Phaser.Math.Distance.Between(testSprite1.x, testSprite1.y, click.x, click.y) < 2) {
    testSprite1.body.reset(click.x, click.y)
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
