extends KinematicBody2D

export(String, 'right', 'left') var direction = 'right' setget set_direction, get_direction

export var health = 23 setget set_health, get_health
export var speed = 25
export var attack = 5
export var defense = 1

func _ready():
	$textures.play('idle')
	
	
	if direction == 'right':
		set_collision_layer_bit(1, true)
		set_collision_mask_bit(2, true)
	else:
		set_collision_layer_bit(2, true)
		set_collision_mask_bit(1, true)
	
	set_process(true)

func _process(delta):
	# ACTION
	if $textures.animation != 'acting':
		$textures.play('acting')
	
	var action = move_and_collide(Vector2(speed, 0) * delta)
	if action and !action.collider.is_in_group(direction):
		# ATTACK; IF POSSIBLE
		if action.collider.has_method('take_health'):
			action.collider.take_health(-(rand_range(0, attack) / (defense * rand_range(0, 1))))
	
	# GRAVITY
	move_and_slide(Vector2(0, 1000))

func set_direction(value):
	if is_in_group(direction):
		remove_from_group(direction)
	direction = value
	add_to_group(direction)
	if direction == 'left':
		speed = -speed
		$textures.flip_h = true

func get_direction():
	return direction

func take_health(value):
	set_health(health + value)

func set_health(value):
	health = value
	
	if health <= 0:
		queue_free()

func get_health():
	return health

func set_size(size):
	health *= size
	speed *= size
	attack *= size
	defense *= size
	
	scale = Vector2(size, size)
