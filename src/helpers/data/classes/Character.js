export default class User {
    constructor({
        _id,
        name,
        health_points,
        mana_points,
        inventory,
        equipment,
        stats,
        skills,
        traits, 
        effects,
        relationship,
        family,
    }) {
        this._id = _id;
        this.name = name;
        this.health_points = health_points;
        this.mana_points = mana_points;
        this.inventory = inventory;
        this.equipment = equipment;
        this.stats = stats;
        this.skills = skills;
        this.traits = traits;
        this.effects = effects;
        this.relationship = relationship;
        this.family = family;
    }
    getData() {
        return {
            name: this.name,
            health_points: this.health_points,
            mana_pointss: this.mana_pointss,
            inventory: this.inventory,
            equipment: this.equipment,
            stats: this.stats,
            skills: this.skills,
            traits: this.traits,
            effects: this.effects,
            relationship: this.relationship,
            family: this.family
        };
    }
}
