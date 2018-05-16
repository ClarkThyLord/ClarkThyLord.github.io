extends KinematicBody2D

export(String, 'user', 'machine') var user_type

export var health = 100 setget set_health, get_health
export var attack = 25
export var defence = 35

func _ready():
	pass

func _process(delta):
	# Called every frame. Delta is time since last frame.
	# Update game logic here.
	pass

func take_health(value):
	set_health(health + value)

func set_health(value):
	health = value
	
	if health <= 0:
		queue_free()

func get_health():
	return health
