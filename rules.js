class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title);
        this.engine.addChoice("Begin the story");
    }

    handleChoice(choice) {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation);
    }
}

class Location extends Scene {
    create(key) {
        this.key = key;
        let locationData = this.engine.storyData.Locations[key];
    
        this.engine.setTitle(this.engine.storyData.Title);
        this.engine.show(locationData.Body);
    
        if (locationData.Items) {
            for (let item of locationData.Items) {
                this.engine.addItem(item);
            }
        }
    
        if (locationData.Choices && locationData.Choices.length > 0) {
            for (let choice of locationData.Choices) {
                this.engine.addChoice(choice.Text, choice);
            }
        } else {
            this.engine.addChoice("The end.");
        }
    }

    handleChoice(choice) {
        if (choice.KeyRequired && !this.engine.hasItem(choice.KeyRequired)) {
            this.engine.show(`&gt; ${choice.Text}`);
            this.engine.show(`You need the ${choice.KeyRequired} to go this way.`);
            return;
        }
    
        this.engine.show(`&gt; ${choice.Text}`);
        this.engine.gotoScene(Location, choice.Target);
    }
    
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');