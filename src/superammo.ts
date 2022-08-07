/* eslint-disable @typescript-eslint/naming-convention */
import { container, DependencyContainer } from "tsyringe";
import { IPreAkiLoadMod } from "@spt-aki/models/external/IPreAkiLoadMod";
import { IPostDBLoadMod } from "@spt-aki/models/external/IPostDBLoadMod";
import { IPostAkiLoadMod } from "@spt-aki/models/external/IPostAkiLoadMod";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";
import { LogTextColor } from "@spt-aki/models/spt/logging/LogTextColor";
import { ITraderAssort, ITraderBase } from "@spt-aki/models/eft/common/tables/ITrader";
import { Item } from "@spt-aki/models/eft/common/tables/IItem";
import { ITraderConfig, UpdateTime } from "@spt-aki/models/spt/config/ITraderConfig";
import { PreAkiModLoader } from "@spt-aki/loaders/PreAkiModLoader";
import { ImageRouter } from "@spt-aki/routers/ImageRouter";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";

const debug = false;
import * as superAmmoTrader from "../db/superammotrader.json";
import { ILocaleGlobalBase } from "@spt-aki/models/spt/server/ILocaleBase";
import { ConfigTypes } from "@spt-aki/models/enums/ConfigTypes";

class SuperAmmo implements IPostAkiLoadMod, IPostDBLoadMod, IPreAkiLoadMod
{
    mod: string;
    private modConfig = require("../config/config.json");
    constructor()
    {
        this.mod = "JoshJ5Hawk-SuperAmmo";
    }
    
    public preAkiLoad(container: DependencyContainer): void 
    {
        // get logger
        const logger = container.resolve<ILogger>("WinstonLogger");
        
        this.registerProfileImage(container);

        this.setupTraderUpdateTime(container);

        logger.logWithColor("Loading: Super Ammo", LogTextColor.cyan);
    }

    public postDBLoad(container: DependencyContainer): void 
    {
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        const JsonUtil = container.resolve<JsonUtil>("JsonUtil");

        db.traders[superAmmoTrader._id] =
        {
            assort: this.createAssortTable(),
            base: JsonUtil.deserialize(JsonUtil.serialize(superAmmoTrader)) as ITraderBase,
            questassort: undefined
        };

        const traderLocales = Object.values(db.locales.global) as ILocaleGlobalBase[];
        for (const locale of traderLocales)
        {
            locale.trading[superAmmoTrader._id] =
            {
                FullName: superAmmoTrader.name,
                FirstName: "Super Ammo Trader",
                Nickname: superAmmoTrader.nickname,
                Location: superAmmoTrader.location,
                Description: "Welcome to the SuperItem Shoppe"
            };
        }

        this.showCaliber();
        //762x25TT
        this.addToHandbook("super762x25tt", "5b47574386f77428ca22b33b", 69);
        this.addToLocale("super762x25tt", "Super 762x25TT", "S. 762x25TT", "Point. Shoot. Kill.");
        this.cloneNewAmmo("5735fdcd2459776445391d61", "super762x25tt");
        this.addToChambersMags("Caliber762x25TT", "super762x25tt");
        //1143x23ACP
        this.addToHandbook("super1143x23ACP", "5b47574386f77428ca22b33b", 69);
        this.addToLocale("super1143x23ACP", "Super 45 RIP", "S. RIP", "Point. Shoot. Kill.");
        this.cloneNewAmmo("5ea2a8e200685063ec28c05a", "super1143x23ACP");
        this.addToChambersMags("Caliber1143x23ACP", "super1143x23ACP");
        //762x39
        this.addToHandbook("super762x39", "5b47574386f77428ca22b33b", 69);
        this.addToLocale("super762x39", "Super 762x39", "S. 762x39", "Point. Shoot. Kill.");
        this.cloneNewAmmo("59e0d99486f7744a32234762", "super762x39");
        this.addToChambersMags("Caliber762x39", "super762x39");
        //762x51
        this.addToHandbook("super762x51", "5b47574386f77428ca22b33b", 69);
        this.addToLocale("super762x51", "Super 762x51", "S. 762x51", "Point. Shoot. Kill.");
        this.cloneNewAmmo("5a6086ea4f39f99cd479502f", "super762x51");
        this.addToChambersMags("Caliber762x51", "super762x51");
        //9x39
        this.addToHandbook("super9x39", "5b47574386f77428ca22b33b", 69);
        this.addToLocale("super9x39", "Super 9x39", "S. 9x39", "Point. Shoot. Kill.");
        this.cloneNewAmmo("5c0d688c86f77413ae3407b2", "super9x39");
        this.addToChambersMags("Caliber9x39", "super9x39");
        //545x39
        this.addToHandbook("super545x39", "5b47574386f77428ca22b33b", 69);
        this.addToLocale("super545x39", "Super 545x39", "S. 545x39", "Point. Shoot. Kill.");
        this.cloneNewAmmo("5c0d5e4486f77478390952fe", "super545x39");
        this.addToChambersMags("Caliber545x39", "super545x39");
        //556x45NATO
        this.addToHandbook("super556x45NATO", "5b47574386f77428ca22b33b", 69);
        this.addToLocale("super556x45NATO", "Super 556x45NATO", "S. 556x45NATO", "Point. Shoot. Kill.");
        this.cloneNewAmmo("59e6920f86f77411d82aa167", "super556x45NATO");
        this.addToChambersMags("Caliber556x45NATO", "super556x45NATO");
        //127x55
        this.addToHandbook("super127x55", "5b47574386f77428ca22b33b", 69);
        this.addToLocale("super127x55", "Super 127x55", "S. 127x55", "Point. Shoot. Kill.");
        this.cloneNewAmmo("5cadf6e5ae921500113bb973", "super127x55");
        this.addToChambersMags("Caliber127x55", "super127x55");
        //762x35
        this.addToHandbook("super762x35", "5b47574386f77428ca22b33b", 69);
        this.addToLocale("super762x35", "Super 762x35", "S. 762x35", "Point. Shoot. Kill.");
        this.cloneNewAmmo("5fbe3ffdf8b6a877a729ea82", "super762x35");
        this.addToChambersMags("Caliber762x35", "super762x35");
        //9x18PM
        this.addToHandbook("super9x18PM", "5b47574386f77428ca22b33b", 69);
        this.addToLocale("super9x18PM", "Super 9x18PM", "S. 9x18PM", "Point. Shoot. Kill.");
        this.cloneNewAmmo("573718ba2459775a75491131", "super9x18PM");
        this.addToChambersMags("Caliber9x18PM", "super9x18PM");
        //366TKM
        this.addToHandbook("super366TKM", "5b47574386f77428ca22b33b", 69);
        this.addToLocale("super366TKM", "Super 366TKM", "S. 366TKM", "Point. Shoot. Kill.");
        this.cloneNewAmmo("59e655cb86f77411dc52a77b", "super366TKM");
        this.addToChambersMags("Caliber366TKM", "super366TKM");
        //40x46
        this.addToHandbook("super40x46", "5b47574386f77428ca22b33b", 69);
        this.addToLocale("super40x46", "Super 40x46", "S. 40x46", "Point. Shoot. Kill.");
        this.cloneNewAmmo("5ede474b0c226a66f5402622", "super40x46");
        this.addToChambersMags("Caliber40x46", "super40x46");
        this.addToRevolvingWeopons("627bce33f21bc425b06ab967", "super40x46");
        //26x75
        this.addToHandbook("super26x75", "5b47574386f77428ca22b33b", 69);
        this.addToLocale("super26x75", "Super 26x75", "S. 26x75", "Point. Shoot. Kill.");
        this.cloneNewAmmo("62389aaba63f32501b1b444f", "super26x75");
        this.addToChambersMags("Caliber26x75", "super26x75");
        //762x54R
        this.addToHandbook("super762x54R", "5b47574386f77428ca22b33b", 69);
        this.addToLocale("super762x54R", "Super 762x54R", "S. 762x54R", "Point. Shoot. Kill.");
        this.cloneNewAmmo("5e023d34e8a400319a28ed44", "super762x54R");
        this.addToChambersMags("Caliber762x54R", "super762x54R");
        //86x70
        this.addToHandbook("super86x70", "5b47574386f77428ca22b33b", 69);
        this.addToLocale("super86x70", "Super .338 ", "S. .338 ", "Point. Shoot. Kill.");
        this.cloneNewAmmo("5fc382a9d724d907e2077dab", "super86x70");
        this.addToChambersMags("Caliber86x70", "super86x70");
        //9x19PARA
        this.addToHandbook("super9x19PARA", "5b47574386f77428ca22b33b", 69);
        this.addToLocale("super9x19PARA", "Super 9x19PARA", "S. 9x19PARA", "Point. Shoot. Kill.");
        this.cloneNewAmmo("5efb0da7a29a85116f6ea05f", "super9x19PARA");
        this.addToChambersMags("Caliber9x19PARA", "super9x19PARA");
        this.addToRevolvingWeopons("624c3074dbbd335e8e6becf3", "super9x19PARA");
        //57x28
        this.addToHandbook("super57x28", "5b47574386f77428ca22b33b", 69);
        this.addToLocale("super57x28", "Super 57x28", "S. 57x28", "Point. Shoot. Kill.");
        this.cloneNewAmmo("5cc86832d7f00c000d3a6e6c", "super57x28");
        this.addToChambersMags("Caliber57x28", "super57x28");
        //9x21
        this.addToHandbook("super9x21", "5b47574386f77428ca22b33b", 69);
        this.addToLocale("super9x21", "Super 9x21", "S. 9x21", "Point. Shoot. Kill.");
        this.cloneNewAmmo("5a269f97c4a282000b151807", "super9x21");
        this.addToChambersMags("Caliber9x21", "super9x21");
        //9x33R
        this.addToHandbook("super9x33R", "5b47574386f77428ca22b33b", 69);
        this.addToLocale("super9x33R", "Super .357", "S. .357", "Point. Shoot. Kill.");
        this.cloneNewAmmo("62330b3ed4dc74626d570b95", "super9x33R");
        this.addToRevolvingWeopons("619f54a1d25cbd424731fb99", "super9x33R");
        this.addToRevolvingWeopons("61a4cda622af7f4f6a3ce617", "super9x33R");
        //23x75
        this.addToHandbook("super23x75", "5b47574386f77428ca22b33b", 69);
        this.addToLocale("super23x75", "Super 23x75", "S. 23x75", "Point. Shoot. Kill.");
        this.cloneNewAmmo("5e85aa1a988a8701445df1f5", "super23x75");
        this.addToChambersMags("Caliber23x75", "super23x75");
        //46x30
        this.addToHandbook("super46x30", "5b47574386f77428ca22b33b", 69);
        this.addToLocale("super46x30", "Super 46x30", "S. 46x30", "Point. Shoot. Kill.");
        this.cloneNewAmmo("5ba26812d4351e003201fef1", "super46x30");
        this.addToChambersMags("Caliber46x30", "super46x30");
        //9x19mm
        this.addToHandbook("super9x19mm", "5b47574386f77428ca22b33b", 69);
        this.addToLocale("super9x19mm", "Super 9x19mm", "S. 9x19mm", "Point. Shoot. Kill.");
        this.cloneNewAmmo("5ba26812d4351e003201fef1", "super9x19mm");
        this.addToRevolvingWeopons("624c3074dbbd335e8e6becf3", "super9x19mm");
        //12g
        this.addToHandbook("super12g", "5b47574386f77428ca22b33b", 69);
        this.addToLocale("super12g", "Boom Buckshot", "12g BOOM", "Point. Shoot. EXPLODE.");
        this.cloneBoomAmmo("560d5e524bdc2d25448b4571", "super12g");
        this.addToChambersMags("Caliber12g", "super12g");
        //20g
        this.addToHandbook("super20g", "5b47574386f77428ca22b33b", 69);
        this.addToLocale("super20g", "Boom Buckshot", "20g BOOM", "Point. Shoot. EXPLODE.");
        this.cloneBoomAmmo("5a38ebd9c4a282000d722a5b", "super20g");
        this.addToChambersMags("Caliber20g", "super20g");
        
        
        //30x29 Come Back To These
        /*this.addToHandbook("Caliber30x29", "5b47574386f77428ca22b33b", 69);
        this.addToLocale("Caliber30x29", "Super 30x29", "S. 30x29", "Point. Shoot. Kill.");
        this.cloneNewAmmo("59e0d99486f7744a32234762", "Caliber30x29");
        this.addToChambersMags("Caliber30x29", "Caliber30x29");*/
        this.addToRevolvingWeopons("60dc519adf4c47305f6d410d", "super12g");
        this.addAmmoToAllChambers("5580223e4bdc2d1c128b457f", "super12g");

        if (debug) console.log("Handbook");
        if (debug) console.log(db.templates.handbook.Items.find(e => e.Id == "super762x25tt"));
        if (debug) console.log("Locale");
        if (debug) console.log(db.locales.global.en.templates["super762x25tt"]);
        //Add Custom Shrapnel
        this.cloneItem("5996f6cb86f774678763a6ca", "myshrap");
        const myShrap = db.templates.items["myshrap"]._props;
        myShrap.Damage = 9001;

        //Wooden ammo box
        this.addToStaticLoot("5909d45286f77465a8136dc6", "super762x39", 250);
        this.addToStaticLoot("5909d45286f77465a8136dc6", "super762x51", 250);
        this.addToStaticLoot("5909d45286f77465a8136dc6", "super9x39", 250);
        this.addToStaticLoot("5909d45286f77465a8136dc6", "super545x39", 250);
        this.addToStaticLoot("5909d45286f77465a8136dc6", "super556x45NATO", 250);
        this.addToStaticLoot("5909d45286f77465a8136dc6", "super127x55", 250);
        this.addToStaticLoot("5909d45286f77465a8136dc6", "super762x35", 250);
        this.addToStaticLoot("5909d45286f77465a8136dc6", "super9x18PM", 250);
        this.addToStaticLoot("5909d45286f77465a8136dc6", "super366TKM", 250);
        this.addToStaticLoot("5909d45286f77465a8136dc6", "super40x46", 250);
        this.addToStaticLoot("5909d45286f77465a8136dc6", "super26x75", 250);
        this.addToStaticLoot("5909d45286f77465a8136dc6", "super762x54R", 250);
        this.addToStaticLoot("5909d45286f77465a8136dc6", "super86x70", 250);
        this.addToStaticLoot("5909d45286f77465a8136dc6", "super9x19PARA", 250);
        this.addToStaticLoot("5909d45286f77465a8136dc6", "super57x28", 250);
        this.addToStaticLoot("5909d45286f77465a8136dc6", "super9x21", 250);
        this.addToStaticLoot("5909d45286f77465a8136dc6", "super9x33R", 250);
        this.addToStaticLoot("5909d45286f77465a8136dc6", "super23x75", 250);
        this.addToStaticLoot("5909d45286f77465a8136dc6", "super20g", 250);
        this.addToStaticLoot("5909d45286f77465a8136dc6", "super46x30", 250);

        //Jacket
        this.addToStaticLoot("5914944186f774189e5e76c2", "super762x39", 250);
        this.addToStaticLoot("5914944186f774189e5e76c2", "super762x51", 250);
        this.addToStaticLoot("5914944186f774189e5e76c2", "super9x39", 250);
        this.addToStaticLoot("5914944186f774189e5e76c2", "super545x39", 250);
        this.addToStaticLoot("5914944186f774189e5e76c2", "super556x45NATO", 250);
        this.addToStaticLoot("5914944186f774189e5e76c2", "super127x55", 250);
        this.addToStaticLoot("5914944186f774189e5e76c2", "super762x35", 250);
        this.addToStaticLoot("5914944186f774189e5e76c2", "super9x18PM", 250);
        this.addToStaticLoot("5914944186f774189e5e76c2", "super366TKM", 250);
        this.addToStaticLoot("5914944186f774189e5e76c2", "super40x46", 250);
        this.addToStaticLoot("5914944186f774189e5e76c2", "super26x75", 250);
        this.addToStaticLoot("5914944186f774189e5e76c2", "super762x54R", 250);
        this.addToStaticLoot("5914944186f774189e5e76c2", "super86x70", 250);
        this.addToStaticLoot("5914944186f774189e5e76c2", "super9x19PARA", 250);
        this.addToStaticLoot("5914944186f774189e5e76c2", "super57x28", 250);
        this.addToStaticLoot("5914944186f774189e5e76c2", "super9x21", 250);
        this.addToStaticLoot("5914944186f774189e5e76c2", "super9x33R", 250);
        this.addToStaticLoot("5914944186f774189e5e76c2", "super23x75", 250);
        this.addToStaticLoot("5914944186f774189e5e76c2", "super20g", 250);
        this.addToStaticLoot("5914944186f774189e5e76c2", "super46x30", 250);

        //this.showWeaponMod()

    }
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public postAkiLoad(container: DependencyContainer): void 
    {
        //   
    }
    private addToHandbook(id:string, parentID:string, price:number)
    {
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        db.templates.handbook.Items.push(
            {

                "Id": id,
                "ParentId": parentID,
                "Price": price

            }
        );
    }
    private addToLocale(id:string, name:string, shortname:string, description:string)
    {
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables(); 
        const locales = db.locales.global.en;
        locales.templates[id] =
            {
                "Name": name,
                "ShortName": shortname,
                "Description": description
            };
    }
    addToRevolvingWeopons(itemId: string, ammoToAdd: string) 
    {
        const logger = container.resolve<ILogger>("WinstonLogger");
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        const weaponID = db.templates.items[itemId];
        for (const index in weaponID._props.Slots)
        {
            logger.log("Adding " + ammoToAdd + " to " + weaponID._name, "cyan")
            const z_Filter = weaponID._props.Slots[index]._props.filters[0].Filter;
            z_Filter.push.apply(z_Filter, [ammoToAdd]);
            const newFilters = [
                {
                    Filter: z_Filter,
                    ExcludedFilter: []
                }
            ];
            weaponID._props.Slots[index]._props.filters = newFilters;
        }
        for (const index in weaponID._props.Cartridges)
        {
            logger.log("Adding " + ammoToAdd + " to " + weaponID._name, "cyan")
            const z_Filter = weaponID._props.Cartridges[index]._props.filters[0].Filter;
            z_Filter.push.apply(z_Filter, [ammoToAdd]);
            const newFilters = [
                {
                    Filter: z_Filter,
                    ExcludedFilter: []
                }
            ];
            weaponID._props.Cartridges[index]._props.filters = newFilters;
        }
        
    }
    private addAmmoToAllMags(caliber:string, ammo:string)
    {
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        for (const item in db.templates.items)
        {
            if (db.templates.items[item]._props.Chambers != undefined && db.templates.items[item]._props.ammoCaliber == caliber)
            {
                if (debug) console.log(item);
                for (const slotIndex in db.templates.items[item]._props.Slots)
                {
                    if (db.templates.items[item]._props.Slots[slotIndex]._name == "mod_magazine")
                    {
                        for (const mags in db.templates.items[item]._props.Slots[slotIndex]._props.filters[0].Filter)
                        {
                            if (debug) console.log("Magazine: " + db.templates.items[item]._props.Slots[slotIndex]._props.filters[0].Filter[mags]);
                            this.addToMagazine(db.templates.items[item]._props.Slots[slotIndex]._props.filters[0].Filter[mags], ammo);    
                        }
                        
                    }
                }
                
            }
        }
    }
    private addToWeaponChamber(weapon:string, ammoToAdd:string)
    {
        const logger = container.resolve<ILogger>("WinstonLogger");
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        const weaponID = db.templates.items[weapon];
        if (weaponID._props.Chambers?.[0]?._props != undefined)
        {
            for (const index in weaponID._props.Chambers)
            {
                if (debug) logger.log("Adding " + ammoToAdd + " to " + db.templates.items[weapon]._name, "cyan")
                const z_Filter = weaponID._props.Chambers[index]._props.filters[0].Filter;
                z_Filter.push.apply(z_Filter, [ammoToAdd]);
                const newFilters = [
                    {
                        Filter: z_Filter,
                        ExcludedFilter: []
                    }
                ]
                weaponID._props.Chambers[0]._props.filters = newFilters;
            }
        }
        //if (debug) logger.log(newFilters, "cyan");
    }
    private addToMagazine(magazine:string, ammoToAdd:string)
    {
        const logger = container.resolve<ILogger>("WinstonLogger");
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        //logger.logWithColor(magazine, LogTextColor.green);
        
        if (db.templates.items[magazine] != undefined)
        {
            const magazineID = db.templates.items[magazine];
            //logger.logWithColor(db.templates.items[magazine]._id, LogTextColor.red)
            if (magazineID._props.Cartridges?.[0]?._props != undefined)
            {
                if (debug) logger.log("Adding " + ammoToAdd + " to " + db.templates.items[magazine]._name, "cyan")
                const z_Filter = magazineID._props.Cartridges[0]._props.filters[0].Filter;
                z_Filter.push.apply(z_Filter, [ammoToAdd]);
                const newFilters = [
                    {
                        Filter: z_Filter,
                        ExcludedFilter: []
                    }
                ];
                logger.logWithColor(magazineID._name, LogTextColor.green);
                logger.logWithColor(ammoToAdd, LogTextColor.yellow)
                magazineID._props.Cartridges[0]._props.filters = newFilters;
            }
            
        }
       
        //if (debug) logger.log(newFilters, "red");
    }
    private addToSlot(id:string, ammoToAdd:string)
    {
        const logger = container.resolve<ILogger>("WinstonLogger");
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        const weaponOrMagID = db.templates.items[id];
        if (weaponOrMagID._props.Slots != undefined && weaponOrMagID._id != "60db29ce99594040e04c4a27" && weaponOrMagID._id != "624c2e8614da335f1e034d8c" && weaponOrMagID._id != "61a4c8884f95bc3b2c5dc96f")
        {
            if (weaponOrMagID._props.Slots?.[0]?._props != undefined)
            {
                for (const index in weaponOrMagID._props.Slots)
                {
                    if (debug) logger.log("Adding " + ammoToAdd + " to " + db.templates.items.weaponOrMagID._name, "cyan")
                    const z_Filter = weaponOrMagID._props.Slots[index]._props.filters[0].Filter;
                    z_Filter.push.apply(z_Filter, [ammoToAdd]);
                    const newFilters = [
                        {
                            Filter: z_Filter,
                            ExcludedFilter: []
                        }
                    ];
                    weaponOrMagID._props.Slots[index]._props.filters = newFilters;
                }
            }
        }
    }
    private addAmmoToAllChambers(caliber:string, ammo:string)
    {
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        for (const item in db.templates.items)
        {
            if (db.templates.items[item]._props.Chambers != undefined && db.templates.items[item]._props.ammoCaliber == caliber)
            {

                this.addToWeaponChamber(db.templates.items[item]._id, ammo);
            }
        }
    }
    private addAmmoToAllSlots(caliber:string, ammo:string)
    {
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        for (const item in db.templates.items)
        {
            if (db.templates.items[item]._props.Slots != undefined && db.templates.items[item]._props.ammoCaliber == caliber)
            {
                this.addToSlot(db.templates.items[item]._id, ammo);
            }
        }
    }
    private showWeaponMod()
    {
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        const logger = container.resolve<ILogger>("WinstonLogger");
        const newArray = [];
        for (const item in db.templates.items)
        {
            if (db.templates.items[item]._props.Slots != undefined)
            {   
                for (const slot in db.templates.items[item]._props.Slots)
                {
                    if (newArray.includes(db.templates.items[item]._props.Slots[slot]._name))
                    {
                        //
                    }
                    else
                    {
                        newArray.push(db.templates.items[item]._props.Slots[slot]._name);
                    }
                }
                
            }
        }
        logger.logWithColor("Weapon Slot Names", LogTextColor.cyan);
        logger.logWithColor(newArray, LogTextColor.red);
    }
    private showCaliber()
    {
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        const logger = container.resolve<ILogger>("WinstonLogger");
        const testArray = [];
        for (const item in db.templates.items)
        {
            
            if (db.templates.items[item]._props.ammoCaliber != undefined)
            {   
                //console.log(db.templates.items[item]._props.ammoCaliber);
                if (testArray.includes(db.templates.items[item]._props.ammoCaliber))
                {
                    //console.log("AlreadyInList");
                }
                else
                {
                    testArray.push(db.templates.items[item]._props.ammoCaliber);
                    //console.log("hi");
                }
            }
        }
        if (debug) logger.logWithColor("Ammo Calibers", LogTextColor.green);
        if (debug) logger.logWithColor(testArray, LogTextColor.red);
    }
    private addToStaticLoot(containerID:string, itemToAdd:string, probablity:number)
    {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const logger = container.resolve<ILogger>("WinstonLogger");
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();

        const lootContainter = db.loot.staticLoot[containerID];
        const lootDistr = lootContainter.itemDistribution;
        
        const newLoot = [
            {
                tpl: itemToAdd,
                relativeProbability: probablity
            }
        ];
        for (const lootItem of newLoot)
        {
            lootDistr.push.apply(lootDistr, [lootItem]);
        }
        lootContainter.itemDistribution = lootDistr;
        //if (debug) logger.log([lootContainter], "green");
    }
    private cloneNewAmmo(ammoToClone:string, newAmmoID:string)
    {
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        const logger = container.resolve<ILogger>("WinstonLogger");
        this.cloneItem(ammoToClone, newAmmoID);
        const ammoID = db.templates.items[newAmmoID];
        ammoID._props.InitialSpeed = this.modConfig.InitialSpeed;
        ammoID._props.BallisticCoeficient = this.modConfig.BallisticCoeficient;
        ammoID._props.Damage = this.modConfig.Damage;
        ammoID._props.ammoAccr = this.modConfig.ammoAccr;
        ammoID._props.ammoRec = this.modConfig.ammoRec;
        ammoID._props.ammoDist = this.modConfig.ammoDist;
        ammoID._props.PenetrationPower = this.modConfig.PenetrationPower;
        ammoID._props.MisfireChance = this.modConfig.MisfireChance;
        ammoID._props.PenetrationChance = this.modConfig.PenetrationChance;
        ammoID._props.MalfMisfireChance = this.modConfig.MalfMisfireChance;
        ammoID._props.DurabilityBurnModificator = this.modConfig.DurabilityBurnModificator;
        ammoID._props.HeatFactor = this.modConfig.HeatFactor;
        ammoID._props.MalfFeedChance = this.modConfig.MalfFeedChance;
        ammoID._props.BackgroundColor = this.modConfig.BackgroundColor;
        ammoID._props.Finallowed = false;
        ammoID._props.FinAllowed = false;
        logger.logWithColor("Ammo " + ammoID._id + " Added", LogTextColor.green);
        
    }
    private cloneBoomAmmo(ammoToClone:string, newAmmoID:string)
    {
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        const logger = container.resolve<ILogger>("WinstonLogger");
        this.cloneItem(ammoToClone, newAmmoID);
        const ammoID = db.templates.items[newAmmoID];
        ammoID._props.InitialSpeed = this.modConfig.InitialSpeed;
        ammoID._props.BallisticCoeficient = this.modConfig.BallisticCoeficient;
        ammoID._props.Damage = this.modConfig.Damage;
        ammoID._props.ammoAccr = this.modConfig.ammoAccr;
        ammoID._props.ammoRec = this.modConfig.ammoRec;
        ammoID._props.ammoDist = this.modConfig.ammoDist;
        ammoID._props.PenetrationPower = this.modConfig.PenetrationPower;
        ammoID._props.MisfireChance = this.modConfig.MisfireChance;
        ammoID._props.PenetrationChance = this.modConfig.PenetrationChance;
        ammoID._props.MalfMisfireChance = this.modConfig.MalfMisfireChance;
        ammoID._props.DurabilityBurnModificator = this.modConfig.DurabilityBurnModificator;
        ammoID._props.HeatFactor = this.modConfig.HeatFactor;
        ammoID._props.MalfFeedChance = this.modConfig.MalfFeedChance;
        ammoID._props.BackgroundColor = this.modConfig.BackgroundColor;
        ammoID._props.buckshotBullets = this.modConfig.buckshotBulletsCount;
        ammoID._props.ProjectileCount = this.modConfig.buckshotBulletsCount;
        ammoID._props.HasGrenaderComponent = true;
        ammoID._props.ShowHitEffectOnExplode = true;
        ammoID._props.FragmentsCount = this.modConfig.fragmentCount;
        ammoID._props.FragmentType = "myshrap";
        ammoID._props.ExplosionType = "big_round_impact_explosive";
        ammoID._props.MinExplosionDistance = this.modConfig.MinExplosionDistance;
        ammoID._props.MaxExplosionDistance = this.modConfig.MaxExplosionDistance;
        ammoID._props.BackgroundColor = "tracerRed"
        ammoID._props.Finallowed = false;
        ammoID._props.FinAllowed = false;
        logger.logWithColor("BoomAmmo " + ammoID._id + " Added", LogTextColor.green);
    }
    private cloneItem(itemtoClone:string, newitemID:string)
    {
        
        const JsonUtil = container.resolve<JsonUtil>("JsonUtil");
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        const logger = container.resolve<ILogger>("WinstonLogger");
        const itemToAdd = newitemID;
        db.templates.items[itemToAdd] = JsonUtil.clone(db.templates.items[itemtoClone])
        db.templates.items[itemToAdd]._id = itemToAdd;
        
        if (debug) logger.logWithColor(db.templates.items[itemtoClone]._name + " cloned", LogTextColor.green);
    }
    private registerProfileImage(container: DependencyContainer): void 
    {
        const preAkiModLoader = container.resolve<PreAkiModLoader>("PreAkiModLoader");
        const imageFilepath = `./${preAkiModLoader.getModPath(this.mod)}res`;

        const imageRouter = container.resolve<ImageRouter>("ImageRouter");
        imageRouter.addRoute(superAmmoTrader.avatar.replace(".jpg", ""), `${imageFilepath}/jj5hammo.jpg`);
    }
    private setupTraderUpdateTime(container: DependencyContainer): void 
    {
        const configServer = container.resolve<ConfigServer>("ConfigServer");
        const traderConfig = configServer.getConfig<ITraderConfig>(ConfigTypes.TRADER);
        const traderRefreshConfig: UpdateTime = {traderId: superAmmoTrader._id, seconds: 3600}
        traderConfig.updateTime.push(traderRefreshConfig);
    }
    private addToChambersMags(caliber:string, ammoToAdd:string)
    {
        this.addAmmoToAllMags(caliber, ammoToAdd);
        this.addAmmoToAllChambers(caliber, ammoToAdd);
    }
    private createAssortTable(): ITraderAssort
    {
        const assortTable: ITraderAssort = {
            items: [],
            barter_scheme: {},
            loyal_level_items: {}
        }

        const ROUBLE_ID = "5449016a4bdc2d6f028b456f";

        //762x25TT
        const newsuper762x25tt: Item = {
            _id: "super762x25tt",
            _tpl: "super762x25tt",
            parentId: "hideout",
            slotId: "hideout",
            upd: {
                UnlimitedCount: true,
                StackObjectsCount: 999999999
            }
        };

        assortTable.items.push(newsuper762x25tt);

        assortTable.barter_scheme["super762x25tt"] = [
            [
                {
                    count: this.modConfig.super762x25ttPrice,
                    _tpl: ROUBLE_ID
                }
            ]
        ];
        assortTable.loyal_level_items["super762x25tt"] = 1;
        //1143x23ACP
        const newsuper1143x23ACP: Item = {
            _id: "super1143x23ACP",
            _tpl: "super1143x23ACP",
            parentId: "hideout",
            slotId: "hideout",
            upd: {
                UnlimitedCount: true,
                StackObjectsCount: 999999999
            }
        };

        assortTable.items.push(newsuper1143x23ACP);

        assortTable.barter_scheme["super1143x23ACP"] = [
            [
                {
                    count: this.modConfig.super1143x23ACPPrice,
                    _tpl: ROUBLE_ID
                }
            ]
        ];
        //12g
        const newsuper12g: Item = {
            _id: "super12g",
            _tpl: "super12g",
            parentId: "hideout",
            slotId: "hideout",
            upd: {
                UnlimitedCount: true,
                StackObjectsCount: 999999999
            }
        };

        assortTable.items.push(newsuper12g);

        assortTable.barter_scheme["super12g"] = [
            [
                {
                    count: this.modConfig.super12gPrice,
                    _tpl: ROUBLE_ID
                }
            ]
        ];
        //super762x39
        const newsuper762x39: Item = {
            _id: "super762x39",
            _tpl: "super762x39",
            parentId: "hideout",
            slotId: "hideout",
            upd: {
                UnlimitedCount: true,
                StackObjectsCount: 999999999
            }
        };

        assortTable.items.push(newsuper762x39);

        assortTable.barter_scheme["super762x39"] = [
            [
                {
                    count: this.modConfig.super762x39Price,
                    _tpl: ROUBLE_ID
                }
            ]
        ];
        assortTable.loyal_level_items["super762x39"] = 1;
        //super762x51
        const newsuper762x51: Item = {
            _id: "super762x51",
            _tpl: "super762x51",
            parentId: "hideout",
            slotId: "hideout",
            upd: {
                UnlimitedCount: true,
                StackObjectsCount: 999999999
            }
        };

        assortTable.items.push(newsuper762x51);

        assortTable.barter_scheme["super762x51"] = [
            [
                {
                    count: this.modConfig.super762x51Price,
                    _tpl: ROUBLE_ID
                }
            ]
        ];
        assortTable.loyal_level_items["super762x51"] = 1;
        //super9x39
        const newsuper9x39: Item = {
            _id: "super9x39",
            _tpl: "super9x39",
            parentId: "hideout",
            slotId: "hideout",
            upd: {
                UnlimitedCount: true,
                StackObjectsCount: 999999999
            }
        };

        assortTable.items.push(newsuper9x39);

        assortTable.barter_scheme["super9x39"] = [
            [
                {
                    count: this.modConfig.super9x39Price,
                    _tpl: ROUBLE_ID
                }
            ]
        ];
        assortTable.loyal_level_items["super9x39"] = 1;
        //super545x39
        const newsuper545x39: Item = {
            _id: "super545x39",
            _tpl: "super545x39",
            parentId: "hideout",
            slotId: "hideout",
            upd: {
                UnlimitedCount: true,
                StackObjectsCount: 999999999
            }
        };

        assortTable.items.push(newsuper545x39);

        assortTable.barter_scheme["super545x39"] = [
            [
                {
                    count: this.modConfig.super545x39Price,
                    _tpl: ROUBLE_ID
                }
            ]
        ];
        assortTable.loyal_level_items["super545x39"] = 1;
        //super556x45NATO
        const newsuper556x45NATO: Item = {
            _id: "super556x45NATO",
            _tpl: "super556x45NATO",
            parentId: "hideout",
            slotId: "hideout",
            upd: {
                UnlimitedCount: true,
                StackObjectsCount: 999999999
            }
        };

        assortTable.items.push(newsuper556x45NATO);

        assortTable.barter_scheme["super556x45NATO"] = [
            [
                {
                    count: this.modConfig.super556x45NATOPrice,
                    _tpl: ROUBLE_ID
                }
            ]
        ];
        assortTable.loyal_level_items["super556x45NATO"] = 1;
        //super127x55
        const newsuper127x55: Item = {
            _id: "super127x55",
            _tpl: "super127x55",
            parentId: "hideout",
            slotId: "hideout",
            upd: {
                UnlimitedCount: true,
                StackObjectsCount: 999999999
            }
        };

        assortTable.items.push(newsuper127x55);

        assortTable.barter_scheme["super127x55"] = [
            [
                {
                    count: this.modConfig.super127x55Price,
                    _tpl: ROUBLE_ID
                }
            ]
        ];
        assortTable.loyal_level_items["super127x55"] = 1;
        //super762x35
        const newsuper762x35: Item = {
            _id: "super762x35",
            _tpl: "super762x35",
            parentId: "hideout",
            slotId: "hideout",
            upd: {
                UnlimitedCount: true,
                StackObjectsCount: 999999999
            }
        };

        assortTable.items.push(newsuper762x35);

        assortTable.barter_scheme["super762x35"] = [
            [
                {
                    count: this.modConfig.super762x35Price,
                    _tpl: ROUBLE_ID
                }
            ]
        ];
        assortTable.loyal_level_items["super762x35"] = 1;
        //super9x18PM
        const newsuper9x18PM: Item = {
            _id: "super9x18PM",
            _tpl: "super9x18PM",
            parentId: "hideout",
            slotId: "hideout",
            upd: {
                UnlimitedCount: true,
                StackObjectsCount: 999999999
            }
        };

        assortTable.items.push(newsuper9x18PM);

        assortTable.barter_scheme["super9x18PM"] = [
            [
                {
                    count: this.modConfig.super9x18PMPrice,
                    _tpl: ROUBLE_ID
                }
            ]
        ];
        assortTable.loyal_level_items["super545x39"] = 1;
        //super366TKM
        const newsuper366TKM: Item = {
            _id: "super366TKM",
            _tpl: "super366TKM",
            parentId: "hideout",
            slotId: "hideout",
            upd: {
                UnlimitedCount: true,
                StackObjectsCount: 999999999
            }
        };

        assortTable.items.push(newsuper366TKM);

        assortTable.barter_scheme["super366TKM"] = [
            [
                {
                    count: this.modConfig.super366TKMPrice,
                    _tpl: ROUBLE_ID
                }
            ]
        ];
        assortTable.loyal_level_items["super366TKM"] = 1;
        //super40x46
        const newsuper40x46: Item = {
            _id: "super40x46",
            _tpl: "super40x46",
            parentId: "hideout",
            slotId: "hideout",
            upd: {
                UnlimitedCount: true,
                StackObjectsCount: 999999999
            }
        };

        assortTable.items.push(newsuper40x46);

        assortTable.barter_scheme["super40x46"] = [
            [
                {
                    count: this.modConfig.super40x46Price,
                    _tpl: ROUBLE_ID
                }
            ]
        ];
        assortTable.loyal_level_items["super40x46"] = 1;
        //super26x75
        const newsuper26x75: Item = {
            _id: "super26x75",
            _tpl: "super26x75",
            parentId: "hideout",
            slotId: "hideout",
            upd: {
                UnlimitedCount: true,
                StackObjectsCount: 999999999
            }
        };

        assortTable.items.push(newsuper26x75);

        assortTable.barter_scheme["super26x75"] = [
            [
                {
                    count: this.modConfig.super26x75Price,
                    _tpl: ROUBLE_ID
                }
            ]
        ];
        assortTable.loyal_level_items["super26x75"] = 1;
        //super762x54R
        const newsuper762x54R: Item = {
            _id: "super762x54R",
            _tpl: "super762x54R",
            parentId: "hideout",
            slotId: "hideout",
            upd: {
                UnlimitedCount: true,
                StackObjectsCount: 999999999
            }
        };

        assortTable.items.push(newsuper762x54R);

        assortTable.barter_scheme["super762x54R"] = [
            [
                {
                    count: this.modConfig.super762x54RPrice,
                    _tpl: ROUBLE_ID
                }
            ]
        ];
        assortTable.loyal_level_items["super762x54R"] = 1;
        //super86x70
        const newsuper86x70: Item = {
            _id: "super86x70",
            _tpl: "super86x70",
            parentId: "hideout",
            slotId: "hideout",
            upd: {
                UnlimitedCount: true,
                StackObjectsCount: 999999999
            }
        };

        assortTable.items.push(newsuper86x70);

        assortTable.barter_scheme["super86x70"] = [
            [
                {
                    count: this.modConfig.super86x70Price,
                    _tpl: ROUBLE_ID
                }
            ]
        ];
        assortTable.loyal_level_items["super86x70"] = 1;
        //super9x19PARA
        const newsuper9x19PARA: Item = {
            _id: "super9x19PARA",
            _tpl: "super9x19PARA",
            parentId: "hideout",
            slotId: "hideout",
            upd: {
                UnlimitedCount: true,
                StackObjectsCount: 999999999
            }
        };

        assortTable.items.push(newsuper9x19PARA);

        assortTable.barter_scheme["super9x19PARA"] = [
            [
                {
                    count: this.modConfig.super9x19PARAPrice,
                    _tpl: ROUBLE_ID
                }
            ]
        ];
        assortTable.loyal_level_items["super9x19PARA"] = 1;
        //super57x28
        const newsuper57x28: Item = {
            _id: "super57x28",
            _tpl: "super57x28",
            parentId: "hideout",
            slotId: "hideout",
            upd: {
                UnlimitedCount: true,
                StackObjectsCount: 999999999
            }
        };

        assortTable.items.push(newsuper57x28);

        assortTable.barter_scheme["super57x28"] = [
            [
                {
                    count: this.modConfig.super57x28Price,
                    _tpl: ROUBLE_ID
                }
            ]
        ];
        assortTable.loyal_level_items["super57x28"] = 1;
        //super9x21
        const newsuper9x21: Item = {
            _id: "super9x21",
            _tpl: "super9x21",
            parentId: "hideout",
            slotId: "hideout",
            upd: {
                UnlimitedCount: true,
                StackObjectsCount: 999999999
            }
        };

        assortTable.items.push(newsuper9x21);

        assortTable.barter_scheme["super9x21"] = [
            [
                {
                    count: this.modConfig.super9x21Price,
                    _tpl: ROUBLE_ID
                }
            ]
        ];
        assortTable.loyal_level_items["super9x21"] = 1;
        //super9x33R
        const newsuper9x33R: Item = {
            _id: "super9x33R",
            _tpl: "super9x33R",
            parentId: "hideout",
            slotId: "hideout",
            upd: {
                UnlimitedCount: true,
                StackObjectsCount: 999999999
            }
        };

        assortTable.items.push(newsuper9x33R);

        assortTable.barter_scheme["super9x33R"] = [
            [
                {
                    count: this.modConfig.super9x33RPrice,
                    _tpl: ROUBLE_ID
                }
            ]
        ];
        assortTable.loyal_level_items["super9x33R"] = 1;
        //super23x75
        const newssuper23x75: Item = {
            _id: "super23x75",
            _tpl: "super23x75",
            parentId: "hideout",
            slotId: "hideout",
            upd: {
                UnlimitedCount: true,
                StackObjectsCount: 999999999
            }
        };

        assortTable.items.push(newssuper23x75);

        assortTable.barter_scheme["super23x75"] = [
            [
                {
                    count: this.modConfig.super23x75Price,
                    _tpl: ROUBLE_ID
                }
            ]
        ];
        assortTable.loyal_level_items["super23x75"] = 1;
        //super20g
        const newsuper20g: Item = {
            _id: "super20g",
            _tpl: "super20g",
            parentId: "hideout",
            slotId: "hideout",
            upd: {
                UnlimitedCount: true,
                StackObjectsCount: 999999999
            }
        };

        assortTable.items.push(newsuper20g);

        assortTable.barter_scheme["super20g"] = [
            [
                {
                    count: this.modConfig.super20gPrice,
                    _tpl: ROUBLE_ID
                }
            ]
        ];
        assortTable.loyal_level_items["super20g"] = 1;
        //super46x30
        const newsuper46x30: Item = {
            _id: "super46x30",
            _tpl: "super46x30",
            parentId: "hideout",
            slotId: "hideout",
            upd: {
                UnlimitedCount: true,
                StackObjectsCount: 999999999
            }
        };

        assortTable.items.push(newsuper46x30);

        assortTable.barter_scheme["super46x30"] = [
            [
                {
                    count: this.modConfig.super46x30Price,
                    _tpl: ROUBLE_ID
                }
            ]
        ];
        assortTable.loyal_level_items["super46x30"] = 1;
        //super9x19mm
        const newsuper9x19mm: Item = {
            _id: "super9x19mm",
            _tpl: "super9x19mm",
            parentId: "hideout",
            slotId: "hideout",
            upd: {
                UnlimitedCount: true,
                StackObjectsCount: 999999999
            }
        };

        assortTable.items.push(newsuper9x19mm);

        assortTable.barter_scheme["super9x19mm"] = [
            [
                {
                    count: this.modConfig.super9x19mmPrice,
                    _tpl: ROUBLE_ID
                }
            ]
        ];
        assortTable.loyal_level_items["super9x19mm"] = 1;

        return assortTable;
    }
}

module.exports = { mod: new SuperAmmo() }