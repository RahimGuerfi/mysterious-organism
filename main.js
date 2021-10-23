// Returns a random DNA base
const returnRandBase = () => {
    const dnaBases = ['A', 'T', 'C', 'G']
    return dnaBases[Math.floor(Math.random() * 4)]
}

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
    const newStrand = []
    for (let i = 0; i < 15; i++) {
        newStrand.push(returnRandBase())
    }
    return newStrand
}

// Returns an object that contains the properties specimenNum and dna and the methods mutate, compareDNA, willLikelySurvive and complementStrand
const pAequorFactory = (number, dnaArray) => {
    return {
        specimenNum: number,
        dna: dnaArray,
        // Returns object dna with randomly selected and mutated base
        mutate() {
            const randomBaseIndx = Math.floor(Math.random() * this.dna.length);
            const base = this.dna[randomBaseIndx];
            let newBase;
            do {
                newBase = returnRandBase();
            } while (newBase === base);
            this.dna[randomBaseIndx] = newBase;

            return this.dna;
        },
        // Compares current Specimen with passed in Specimen and prints % of DNA in common
        compareDNA(pAequor) {
            const comparedDNA = pAequor.dna;
            let i = 0;
            let common = 0;
            while (i < 15) {
                common = (comparedDNA[i] === this.dna[i]) ? (common + 1) : common;
                i++;
            }
            console.log(`specimen #${this.specimenNum} and specimen #${pAequor.specimenNum} have ${(common/15 * 100).toFixed(2)}% DNA in common`)
        },
        // Returns true if DNA is made up of at least 60% 'C' or 'G' bases
        willLikelySurvive() {
            const survive = this.dna.filter(item => (item === 'C' || item === 'G'));
            const surviveRate = survive.length / 15 * 100;
            return surviveRate >= 60;
        },
        // Returns the complementary DNA strand
        complementStrand() {
            return complementStrand = this.dna.map(item => {
                let complement;
                switch (item) {
                    case 'A':
                        complement = 'T';
                        break;
                    case 'T':
                        complement = 'A';
                        break;
                    case 'C':
                        complement = 'G';
                        break;
                    case 'G':
                        complement = 'C';
                        break;
                }
                return complement;
            })
        }
    };
}

// Create an array of 30 pAequors instances that can survive
const pAequors = [];
let willSurvive;
let pAequorInstance;
for (let i = 0; i < 30; i++) {
    do {
        pAequorInstance = pAequorFactory(i + 1, mockUpStrand());
        willSurvive = pAequorInstance.willLikelySurvive();
    } while (!willSurvive);

    pAequors.push(pAequorInstance);
}

// Some methods tests

// Print first pAequor instance complementStrand
console.log(`DNA Strand: ${pAequors[0].dna}`);
console.log(`Complement Strand: ${pAequors[0].complementStrand()}`);

// Compare third and last pAequors
pAequors[2].compareDNA(pAequors[29]);