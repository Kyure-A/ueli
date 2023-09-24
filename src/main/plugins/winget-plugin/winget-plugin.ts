import { PluginType } from "../../plugin-type";
import { UserConfigOptions } from "../../../common/config/user-config-options";
import { ExecutionPlugin } from "../../execution-plugin";
import { WingetOptions } from "../../../common/config/winget-options";
import { SearchResultItem } from "../../../common/search-result-item";

import { execFileSync } from "child_process";
import { WingetPackageList } from "./winget-package-list";
import { defaultCalculatorIcon } from "../../../common/icon/default-icons";

export class WingetPlugin implements ExecutionPlugin {
    public pluginType = PluginType.Winget;
    constructor(private config: WingetOptions) { }

    public isValidUserInput(userInput: string): boolean {
        return true;
    }
    public getSearchResults(userInput: string): Promise<SearchResultItem[]> {
        return new Promise((resolve) => {
            let result: SearchResultItem[] = [];
            const package_list: WingetPackageList = JSON.parse(execFileSync("powershell", ["-File", "./winget-plugin.ps1"]).toString());

            for (let i = 0; i < package_list.Sources.length; i++) {
                for (let j = 0; j < package_list.Sources[i].Packages.length; j++) {
                    const package_name: string = package_list.Sources[i].Packages[j].PackageIdentifier;
                    result.push(this.buildSearchResults(package_name));
                }
            }

            resolve(result);
        })
    }
    public isEnabled(): boolean {
        return this.config.isEnabled; // common/config/ に option をつくる
    }
    public execute(): Promise<void> {

    }
    public updateConfig(updatedConfig: UserConfigOptions): Promise<void> {
        return new Promise((resolve) => {
            this.config = updatedConfig.wingetOptions;
            // this.translationSet = translationSet;
            resolve();
        });
    }

    private buildSearchResults(package_name: string): SearchResultItem {
        return {
            description: "a",
            executionArgument: package_name,
            hideMainWindowAfterExecution: true,
            icon: defaultCalculatorIcon,
            name: package_name,
            originPluginType: this.pluginType,
            searchable: [],
        }
    }
}
