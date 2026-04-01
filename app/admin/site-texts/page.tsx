import { getSiteTexts, updateSiteText } from "./actions";
import { Save, TextQuote } from "lucide-react";

export default async function SiteTextsPage() {
    let siteTexts: Record<string, string> = {};
    try {
        siteTexts = await getSiteTexts();
    } catch (e) {
        // Handle gracefully if DB isn't connected
    }

    // Pre-define the keys we want them to edit
    const editableKeys = [
        { key: "hero_greeting", label: "Hero Greeting", default: "Hello There" },
        { key: "hero_name", label: "Hero Name", default: "I'm Erlangga" },
        { key: "hero_desc_1", label: "Hero Description 1", default: "Fullstack Developer & AI Engineer." },
        { key: "hero_desc_2", label: "Hero Description 2", default: "Building intelligent, high-performance web experiences." }
    ];

    return (
        <div className="space-y-8 pb-16">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
                        Site Texts
                    </h1>
                    <p className="font-mono text-sm text-neutral-500">
                        Dynamically edit the wording across your portfolio.
                    </p>
                </div>
            </header>

            <div className="grid gap-6">
                {editableKeys.map(({ key, label, default: defValue }) => (
                    <div key={key} className="bg-black border border-white/10 p-6 rounded-2xl flex flex-col md:flex-row gap-6 items-start md:items-center">
                        <div className="flex-1 w-full">
                            <div className="flex items-center gap-2 mb-2">
                                <TextQuote className="w-4 h-4 text-neutral-500" />
                                <h3 className="text-white font-semibold text-sm">{label}</h3>
                            </div>
                            <p className="text-xs font-mono text-neutral-500 mb-4">Key: {key}</p>
                            
                            <form action={updateSiteText} className="flex gap-4">
                                <input type="hidden" name="key" value={key} />
                                <input 
                                    name="value" 
                                    defaultValue={siteTexts[key] || defValue} 
                                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                                    required
                                />
                                <button type="submit" className="bg-white text-black px-4 py-2 border border-white rounded-xl text-sm font-semibold hover:bg-neutral-200 transition-colors flex items-center gap-2 shrink-0 group">
                                    <Save className="w-4 h-4 opacity-70 group-hover:opacity-100" />
                                    Save
                                </button>
                            </form>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
