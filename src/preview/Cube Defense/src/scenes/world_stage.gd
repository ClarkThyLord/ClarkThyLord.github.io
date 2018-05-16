extends Node2D

var cost = 100

func _ready():
	set_process(true)
	
	$GUI/size/size_val.connect('text_entered', self, 'mass_to_money')
	$GUI/cost/cost_val.connect('text_entered', self, 'money_to_mass')
	$GUI/buy.connect('pressed', self, 'buy')

func _process(delta):
	if !$user:
		get_tree().quit()
	else:
		$GUI/information.text = 'Health: ' + str($user.health) + ' | Money: $' + str($user.money)

func mass_to_money(mass):
	mass = int(mass)
	if mass && mass >= 0 && typeof(mass) != TYPE_INT:
		return
	
	var value = mass / 0.1 * 10
	
	$GUI/cost/cost_val.text = str(value)
	
	cost = value
	
	return value

func money_to_mass(money):
	money = int(money)
	if money && money >= 0 && typeof(money) != TYPE_INT:
		return
	
	var value = money * 0.1 / 10
	
	$GUI/size/size_val.text = str(value)
	
	return value

func buy():
	if cost > $user.money:
		return
	
	$user.money -= -cost
	
	$user.create_slime(money_to_mass(cost))
