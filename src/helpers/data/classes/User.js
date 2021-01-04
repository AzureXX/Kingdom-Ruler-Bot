import Character from './Character';

export default class User extends Character {
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
        super(
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
            family
        );
    }
}
