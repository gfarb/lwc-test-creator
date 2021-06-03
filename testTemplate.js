import { createElement } from "lwc";
import { lwcName } from "c/{lwcName}";

describe("TODO: Describe Test Suite", () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });
    
    it("TODO: Construct Initial Test", () => {
        const element = createElement("c-{lwcNameForJestTest}", {
            is: { lwcName },
        });
        document.body.appendChild(element);
        return Promise.resolve().then(() => {
            expect(document.body.firstChild).not.toBeNull();
        });
    });
});