export type ServiceGuideDetail = {
  simpleMeaning: string;
  whyItMatters: string;
  decisionSupports: string;
};

export const serviceGuideDetails: Record<string, ServiceGuideDetail> = {
  "survey-mapping": {
    simpleMeaning: "This service measures and records the site so planning is based on actual conditions rather than guesswork.",
    whyItMatters: "A small mistake in a boundary, level, access route, or existing feature can affect a building layout, drainage plan, road connection, or construction quantity. Survey information gives the design and construction team a common reference and can reveal differences between an old drawing and the current site.",
    decisionSupports: "Should the proposed layout fit the site as it exists? Are the available drawings reliable enough for the next stage? What site information must be resolved before design or construction begins?",
  },
  "digital-land-survey": {
    simpleMeaning: "This is a measured digital version of the land or property that engineers, architects, and contractors can use.",
    whyItMatters: "A digital record makes it easier to coordinate levels, boundaries, existing features, and proposed work. It is especially valuable when several people need to work from the same information or when an as-built record is required after construction.",
    decisionSupports: "What should be shown in the plan or model? Do the proposed works fit the actual plot, levels, and existing features? Which digital file format is needed for the next design stage?",
  },
  "soil-investigation": {
    simpleMeaning: "This service examines the ground beneath a site before the foundation approach is finalized.",
    whyItMatters: "Two nearby plots can have different soil layers and groundwater conditions. Soil behaviour affects foundation depth, settlement risk, excavation, drainage, and construction cost. Foundation decisions should therefore use information from the actual ground available for the project.",
    decisionSupports: "What ground conditions must the foundation design consider? Is more investigation needed? What risks should be considered before selecting a foundation option?",
  },
  "integrity-test": {
    simpleMeaning: "This service investigates whether a concrete or structural element appears continuous and consistent within the limits of the agreed test.",
    whyItMatters: "Defects, discontinuities, voids, or unexpected conditions may not be visible from the outside. Information from an integrity investigation can help the team decide whether repair, further testing, alteration, or additional review is appropriate.",
    decisionSupports: "Is the tested element suitable for the next planned activity, or should the project investigate the concern further before proceeding?",
  },
  "pile-load-test": {
    simpleMeaning: "A controlled load is applied to a pile and its movement or response is measured.",
    whyItMatters: "The test provides project-specific field evidence about pile behaviour within the approved testing programme. It does not replace the full foundation design or automatically represent every pile on a site; the result must be interpreted within the test arrangement and project requirements.",
    decisionSupports: "Does the observed pile response provide the information required for the foundation-verification decision? Are further checks or actions needed?",
  },
  "detailed-engineering-assessment": {
    simpleMeaning: "This is a structured review of an existing building or structural system before an important decision is made.",
    whyItMatters: "A visible crack, deflection, corrosion mark, settlement symptom, or change in building use can have different causes. An assessment brings together drawings, history, observations, photographs, and agreed tests so the next step is based on evidence rather than a quick visual assumption.",
    decisionSupports: "Is the structure suitable for the proposed use or change? Is repair, strengthening, monitoring, further testing, or a more detailed design stage required?",
  },
  "core-cutting-concrete-scanning": {
    simpleMeaning: "Ferro scanning helps locate reinforcement and embedded features before work is carried out; core cutting creates a controlled opening or removes a concrete sample when required.",
    whyItMatters: "Drilling or cutting without understanding what is inside concrete can damage reinforcement, services, or the structure. Scanning reduces uncertainty before intervention, while core cutting provides a planned sample or opening. These activities should be coordinated with the structural purpose and site safety requirements.",
    decisionSupports: "Where can work be carried out with lower risk? Is a concrete sample or opening needed? Does the planned location need to be changed because of detected reinforcement or other features?",
  },
  "rebar-fixing": {
    simpleMeaning: "This service checks that reinforcing steel is placed, tied, supported, and prepared in accordance with the approved structural information before concrete covers it.",
    whyItMatters: "Once concrete is poured, many reinforcement details cannot be seen easily. Incorrect bar size, spacing, lap, anchorage, or concrete cover can affect intended structural performance and may be costly to correct later. A pre-pour review identifies outstanding points before they become hidden.",
    decisionSupports: "Is the reinforcement ready for the planned concrete work, or are corrections and clarifications needed first?",
  },
  "grout-micro-concrete": {
    simpleMeaning: "These materials are used where ordinary concrete may not properly fill a confined space or where a targeted repair or strengthening treatment is required.",
    whyItMatters: "Performance depends on the cause of the defect, surface preparation, access, material selection, placing, curing, and protection. The material alone does not solve every structural or repair problem; the application must match the location and intended function.",
    decisionSupports: "What repair or filling method is suitable for the affected area? What preparation and application controls are necessary?",
  },
  retrofitting: {
    simpleMeaning: "Retrofitting modifies or strengthens an existing structure so that it can meet a changed requirement or address an identified weakness.",
    whyItMatters: "An existing structure has a history, condition, load path, materials, and construction limitations. Adding a repair or strengthening material without understanding those factors may not address the real problem. Retrofitting should begin with assessment and proceed through an appropriate technical solution.",
    decisionSupports: "What is the actual performance problem? Can the structure be adapted for the proposed use? Which improvement option is practical, and what design or construction work must follow?",
  },
  "construction-chemicals": {
    simpleMeaning: "Construction chemicals are specialized products for repair, bonding, sealing, protection, grouting, and related work. Waterproofing is the planned control of unwanted water entry or moisture movement.",
    whyItMatters: "A product that works in one location may fail in another because of different surfaces, water pressure, movement, weather exposure, preparation, or application conditions. Waterproofing depends especially on identifying where water comes from and whether drainage, joints, cracks, or surface defects also need treatment.",
    decisionSupports: "What is causing the defect or water problem? Which system is compatible with the surface and exposure? What preparation, application, protection, and maintenance are required?",
  },
  "earthing-boring": {
    simpleMeaning: "This service supports the boring and site-preparation work associated with an earthing electrode and grounding arrangement.",
    whyItMatters: "Earthing work must be coordinated with the building, electrical installation, underground services, access conditions, and applicable requirements. Boring in the wrong location can damage existing services or create site and safety problems. The electrical design and testing requirements must remain clear.",
    decisionSupports: "Where can the work be carried out safely? What site restrictions must be considered? What information does the responsible electrical professional need for the grounding arrangement?",
  },
  "landscape-gardening": {
    simpleMeaning: "This service plans outdoor areas so people can use them comfortably and planting and site features can be maintained in practical conditions.",
    whyItMatters: "A successful landscape plan must consider more than appearance. Levels, drainage, sunlight, access, pedestrian movement, plant suitability, irrigation, maintenance, and intended use all affect long-term performance. Early coordination can prevent conflicts with entrances, utilities, parking, and site drainage.",
    decisionSupports: "How should the outdoor area be used? Which planting and circulation choices suit the site? What needs to be planned now so the landscape remains practical after installation?",
  },
};

Object.assign(serviceGuideDetails, {
  "core-cutting": { simpleMeaning: "This service creates a controlled opening or concrete sample when focused information is needed.", whyItMatters: "A planned cut can answer a specific question, but location, reinforcement risk, access, safety, and the intended use of the opening or sample should be agreed first.", decisionSupports: "What information is needed from the concrete? Where can the cut be made safely, and what work should follow?" },
  "ferro-scanning": { simpleMeaning: "This service helps locate reinforcement before drilling, cutting, anchoring, or altering existing concrete.", whyItMatters: "Scanning reduces uncertainty before intrusive work, but findings depend on the element, surface, access, equipment, and agreed scanning conditions.", decisionSupports: "Where can the next operation be carried out with lower risk, and does the planned location need to change?" },
  "construction-chemicals": { simpleMeaning: "This service supports the selection and application of specialized products for repair, bonding, sealing, protection, and grouting.", whyItMatters: "Material performance depends on the substrate, defect, exposure, preparation, compatibility, application, curing, and protection—not the product name alone.", decisionSupports: "Which material system matches the problem, and what preparation and application controls are required?" },
  "waterproofing": { simpleMeaning: "This service plans how to control unwanted water entry or moisture movement through a compatible waterproofing system.", whyItMatters: "Durable waterproofing begins with the water source and considers cracks, joints, drainage, movement, substrate, preparation, application, and protection.", decisionSupports: "What is causing the water problem, which system is compatible, and what work must happen before application?" },
});
