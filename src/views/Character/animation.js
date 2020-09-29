import anime from 'animejs/lib/anime.es.js';

export const CharacterAnimation = {
    methods: {
        handleOnClickSlider(indexSlider) {
            const character = this.characters[indexSlider];

            var tl = anime.timeline({
                easing: "easeOutExpo",
                duration: 200
            });

            // Add children
            tl.add({
                targets: ".character-view__title",
                translateX: 10,
                rotate: [-90, -90],
                opacity: [0.1, 0]
            })
                .add({
                    targets: ".character-view__picture",
                    translateX: 10,
                    opacity: [1, 0]
                })
                .add({
                    targets: ".character-desc__title",
                    translateY: 10,
                    opacity: [1, 0]
                })
                .add({
                    targets: ".character-desc__column:first-child",
                    translateY: 10,
                    opacity: [1, 0]
                })
                .add({
                    targets: ".character-desc__column:last-child",
                    translateY: 10,
                    opacity: [1, 0]
                })
                .add({
                    targets: ".character-desc__button",
                    backgroundColor: character.color
                })
                .add({
                    targets: ".character",
                    backgroundColor: character.bg,
                    complete: () => {
                        this.indexCharacter = indexSlider;
                    }
                }, "-=200")
                .add({
                    targets: ".character-view__title",
                    translateX: 0,
                    rotate: [-90, -90],
                    opacity: [0, 0.1]
                })
                .add({
                    targets: ".character-view__picture",
                    translateX: 0,
                    opacity: 1
                })
                .add({
                    targets: ".character-desc__title",
                    translateY: 0,
                    opacity: [0, 1]
                })
                .add({
                    targets: ".character-desc__column:first-child",
                    translateY: 0,
                    opacity: [0, 1]
                })
                .add({
                    targets: ".character-desc__column:last-child",
                    translateY: 0,
                    opacity: [0, 1]
                });
        }
    }
}