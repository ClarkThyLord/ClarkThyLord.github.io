extends KinematicBody2D

export(String, 'user', 'machine') var user_type

export var money = 300

export var health = 100 setget set_health, get_health
export var attack = 25
export var defence = 35

onready var slime = preload("res://entities/slime/slime.tscn")

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
	
	if health <= 0 and user_type != 'user':
		queue_free()

func get_health():
	return health

func create_slime(size):
	var slime_instance = slime.instance()
	
	var direction = 'right'
	if user_type == 'machine':
		direction = 'left'
	slime_instance.set_direction(direction)
	slime_instance.set_size(size)
	
	add_child(slime_instance)
