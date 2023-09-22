import { PluginType } from "../../plugin-type";
import { ExecutionPlugin } from "../../execution-plugin";
import { WingetOptions } from "../../../common/config/winget-options";

import { SearchResultItem } from "../../../common/search-result-item";

export class WingetPlugin implements ExecutionPlugin {
    public pluginType = PluginType.Winget;
    private config: WingetOptions;
    constructor(config: WingetOptions) {
        this.config = config;
    }

    public isValidUserInput(userInput: string): boolean {
        return true;
    }
    public getSearchResults(userInput: string): Promise<SearchResultItem[]> {

    }
    public isEnabled(): boolean {
        return this.config.isEnabled; // common/config/ に option をつくる
    }
    public execute() {

    }
    public updateConfig(updatedConfig: WingetOptions): Promise<void> {
        return new Promise((resolve) => {
            this.config = updatedConfig;
            // this.translationSet = translationSet;
            resolve();
        });
    }
}
