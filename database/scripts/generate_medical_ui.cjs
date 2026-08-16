const fs = require('fs');
const file = './src/components/ExamsDirectory.tsx';
let content = fs.readFileSync(file, 'utf8');

const updatedMedicalInfoUI = `
          {/* Medical Levels Info Block */}
          {specCategoryFilter === 'med' && (
            <div className="w-full bg-slate-900 text-slate-100 p-6 md:p-8 rounded-[2rem] mb-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <span className="text-9xl">⚕️</span>
              </div>
              <div className="relative z-10 space-y-6">
                <div>
                  <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight flex items-center gap-3">
                    <span className="text-red-500">🏥</span> MEDICAL EDUCATION HIERARCHY
                  </h3>
                  <p className="text-slate-400 font-medium mt-2 text-sm md:text-base max-w-2xl">
                    A comprehensive structural breakdown of medical qualifications and their exhaustive specializations.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* LEVEL 1 */}
                  <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700/50 hover:border-slate-600 transition-colors">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Level 1</h4>
                    <h5 className="text-xl font-black text-white mb-4">Undergraduate (UG)</h5>
                    <div className="space-y-4">
                      <div>
                        <h6 className="text-xs font-bold text-emerald-400 mb-1.5">Allopathy & Dental</h6>
                        <div className="flex flex-wrap gap-1.5">
                          {["MBBS", "BDS"].map(s => <span key={s} className="px-2 py-1 bg-slate-950 text-slate-300 text-[10px] font-bold rounded-md border border-slate-700">{s}</span>)}
                        </div>
                      </div>
                      <div>
                        <h6 className="text-xs font-bold text-emerald-400 mb-1.5">AYUSH Systems</h6>
                        <div className="flex flex-wrap gap-1.5">
                          {["BAMS", "BHMS", "BUMS", "BSMS", "BNYS"].map(s => <span key={s} className="px-2 py-1 bg-slate-950 text-slate-300 text-[10px] font-bold rounded-md border border-slate-700">{s}</span>)}
                        </div>
                      </div>
                      <div>
                        <h6 className="text-xs font-bold text-emerald-400 mb-1.5">Veterinary & Allied Health</h6>
                        <div className="flex flex-wrap gap-1.5">
                          {["BVSc & AH", "B.Pharm", "Pharm.D", "B.Sc Nursing", "BPT", "BOT", "BASLP", "B.Sc MLT", "B.Sc OT Tech", "B.Sc Radiology", "B.Sc Perfusion", "B.Sc Dialysis", "BMLT", "B.Sc Cardiac", "B.Sc Anaesthesia", "B.Optom", "B.Sc Neuro", "BPO"].map(s => <span key={s} className="px-2 py-1 bg-slate-950 text-slate-300 text-[10px] font-bold rounded-md border border-slate-700">{s}</span>)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* LEVEL 2 */}
                  <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700/50 hover:border-slate-600 transition-colors">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Level 2</h4>
                    <h5 className="text-xl font-black text-white mb-4">Postgraduate (PG)</h5>
                    <div className="space-y-4 max-h-[320px] overflow-y-auto pr-2 scrollbar-thin">
                      <div>
                        <h6 className="text-xs font-bold text-blue-400 mb-1.5">MD (Doctor of Medicine - 32 Specs)</h6>
                        <div className="flex flex-wrap gap-1.5">
                          {["General Medicine", "Paediatrics", "Psychiatry", "Dermatology (DVL)", "Radiology", "Anaesthesiology", "Pathology", "Microbiology", "Biochemistry", "Physiology", "Anatomy", "Pharmacology", "Forensic Medicine", "Community Medicine", "Pulmonology", "Obstetrics & Gynaecology", "Physical Medicine", "Nuclear Medicine", "Emergency Medicine", "Geriatrics", "Palliative Medicine", "Sports Medicine", "Radiation Oncology", "Hospital Administration", "Immuno-Haematology", "Transfusion Medicine", "Reproductive Medicine", "Clinical Pharmacology", "Medical Genetics", "Occupational Medicine", "Aviation Medicine", "Tropical Medicine"].map(s => <span key={s} className="px-2 py-1 bg-slate-950 text-slate-300 text-[10px] font-bold rounded-md border border-slate-700">{s}</span>)}
                        </div>
                      </div>
                      <div>
                        <h6 className="text-xs font-bold text-blue-400 mb-1.5">MS (Master of Surgery - 7 Specs)</h6>
                        <div className="flex flex-wrap gap-1.5">
                          {["General Surgery", "Orthopaedics", "Ophthalmology", "ENT", "Obstetrics & Gynaecology", "Anatomy", "Traumatology & Surgery"].map(s => <span key={s} className="px-2 py-1 bg-slate-950 text-slate-300 text-[10px] font-bold rounded-md border border-slate-700">{s}</span>)}
                        </div>
                      </div>
                      <div>
                        <h6 className="text-xs font-bold text-blue-400 mb-1.5">MDS & AYUSH PG</h6>
                        <div className="flex flex-wrap gap-1.5">
                          {["Oral Surgery", "Orthodontics", "Prosthodontics", "Periodontics", "Conservative Dentistry", "Oral Radiology", "Paediatric Dentistry", "Oral Pathology", "Public Health Dentistry", "Oral Implantology", "MD (Ayu)", "MS (Ayu)", "MD (Hom)", "MD (Unani)"].map(s => <span key={s} className="px-2 py-1 bg-slate-950 text-slate-300 text-[10px] font-bold rounded-md border border-slate-700">{s}</span>)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* LEVEL 3 */}
                  <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700/50 hover:border-slate-600 transition-colors">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Level 3 (Highest)</h4>
                    <h5 className="text-xl font-black text-white mb-4">Super Specialty</h5>
                    <div className="space-y-4 max-h-[320px] overflow-y-auto pr-2 scrollbar-thin">
                      <div>
                        <h6 className="text-xs font-bold text-purple-400 mb-1.5">DM (Non-Surgical - 31 Specs)</h6>
                        <div className="flex flex-wrap gap-1.5">
                          {["Cardiology", "Neurology", "Nephrology", "Gastroenterology", "Endocrinology", "Medical Oncology", "Clinical Haematology", "Rheumatology", "Hepatology", "Infectious Diseases", "Neonatology", "Paediatric Cardiology", "Paediatric Neurology", "Paediatric Haematology-Oncology", "Paediatric Nephrology", "Paediatric Gastroenterology", "Paediatric Pulmonology", "Cardiac Anaesthesia", "Neuro Anaesthesia", "Critical Care Medicine", "Paediatric Anaesthesia", "Organ Transplant Anaesthesia", "Medical Genetics", "Reproductive Medicine", "Nuclear Medicine", "Geriatric Medicine", "Palliative Medicine", "Immunology", "Clinical Pharmacology", "Radiotherapy", "Pulmonary Medicine"].map(s => <span key={s} className="px-2 py-1 bg-slate-950 text-slate-300 text-[10px] font-bold rounded-md border border-slate-700">{s}</span>)}
                        </div>
                      </div>
                      <div>
                        <h6 className="text-xs font-bold text-purple-400 mb-1.5">MCh (Surgical - 28 Specs)</h6>
                        <div className="flex flex-wrap gap-1.5">
                          {["Neurosurgery", "Cardiothoracic Surgery", "Vascular Surgery", "Plastic Surgery", "Paediatric Surgery", "Surgical Oncology", "Urology", "Surgical Gastroenterology", "Liver Transplant Surgery", "Burns & Plastic Surgery", "Endocrine Surgery", "Colorectal Surgery", "Hand Surgery", "Spine Surgery", "Joint Replacement Surgery", "Foot & Ankle Surgery", "Head & Neck Surgery", "Otology", "Rhinology", "Vitreo-Retinal Surgery", "Cornea Surgery", "Glaucoma Surgery", "Oculoplasty", "Paediatric Ophthalmology", "Gynaecological Oncology", "Maternal-Fetal Medicine", "Laparoscopic Surgery", "Renal Transplant Surgery"].map(s => <span key={s} className="px-2 py-1 bg-slate-950 text-slate-300 text-[10px] font-bold rounded-md border border-slate-700">{s}</span>)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* LEVEL 4 */}
                  <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700/50 hover:border-slate-600 transition-colors">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Level 4</h4>
                    <h5 className="text-xl font-black text-white mb-4">Research & Diplomas</h5>
                    <div className="space-y-4">
                      <div>
                        <h6 className="text-xs font-bold text-amber-400 mb-1.5">PG Diplomas (2 Years)</h6>
                        <div className="flex flex-wrap gap-1.5">
                          {["DGO", "DCH", "DOMS", "DLO", "DPM", "DA", "DPH", "DFM", "DTCD", "DRD", "Dip. Derm", "DMRD", "DMRT", "DNB (Dip)"].map(s => <span key={s} className="px-2 py-1 bg-slate-950 text-slate-300 text-[10px] font-bold rounded-md border border-slate-700">{s}</span>)}
                        </div>
                      </div>
                      <div>
                        <h6 className="text-xs font-bold text-amber-400 mb-1.5">Doctorate & Research</h6>
                        <div className="flex flex-wrap gap-1.5">
                          {["PhD", "DSc", "DrPH", "MD (Research)", "MPH", "MBA (HA)"].map(s => <span key={s} className="px-2 py-1 bg-slate-950 text-slate-300 text-[10px] font-bold rounded-md border border-slate-700">{s}</span>)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
`;

const oldMedicalInfoUIStart = `{/* Medical Levels Info Block */}
          {specCategoryFilter === 'med' && (`;
const oldMedicalInfoUIEnd = `                  </div>
                </div>
              </div>
            </div>
          )}`;

let startIndex = content.indexOf(oldMedicalInfoUIStart);
if (startIndex !== -1) {
  let endIndex = content.indexOf(oldMedicalInfoUIEnd, startIndex);
  if (endIndex !== -1) {
    let oldBlock = content.substring(startIndex, endIndex + oldMedicalInfoUIEnd.length);
    content = content.replace(oldBlock, updatedMedicalInfoUI.trim());
    fs.writeFileSync(file, content);
    console.log("Successfully replaced the medical info block with detailed specializations.");
  } else {
    console.log("Could not find the end of the medical info block.");
  }
} else {
  console.log("Could not find the start of the medical info block.");
}
