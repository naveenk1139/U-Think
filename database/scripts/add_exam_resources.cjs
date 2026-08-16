const fs = require('fs');
let content = fs.readFileSync('src/components/ExamsDirectory.tsx', 'utf8');

const resourcesSection = `
                </div>

                {/* Resources Section */}
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
                    📚 RECOMMENDED RESOURCES & QUICK LINKS
                  </h4>
                  <div className="space-y-3">
                    <a 
                      href={\`https://www.google.com/search?q=\${encodeURIComponent(selectedExamForModal.name + " official website")}\`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 bg-blue-50/50 hover:bg-blue-50 border border-blue-100 rounded-2xl group transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
                          <BookOpen className="w-4 h-4" />
                        </div>
                        <div>
                          <h5 className="text-sm font-bold text-slate-800 group-hover:text-blue-700 transition-colors">Official Website & Latest Notifications</h5>
                          <p className="text-xs text-slate-500 font-medium">Search for the official portal and latest updates</p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-blue-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                    </a>

                    <a 
                      href={\`https://www.google.com/search?q=\${encodeURIComponent(selectedExamForModal.name + " syllabus and exam pattern")}\`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 bg-emerald-50/50 hover:bg-emerald-50 border border-emerald-100 rounded-2xl group transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-100 text-emerald-600 rounded-xl">
                          <BookOpen className="w-4 h-4" />
                        </div>
                        <div>
                          <h5 className="text-sm font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">Syllabus & Exam Pattern</h5>
                          <p className="text-xs text-slate-500 font-medium">Find detailed topic-wise syllabus and marking scheme</p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                    </a>

                    <a 
                      href={\`https://www.google.com/search?q=\${encodeURIComponent(selectedExamForModal.name + " previous year question papers pdf")}\`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 bg-purple-50/50 hover:bg-purple-50 border border-purple-100 rounded-2xl group transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 text-purple-600 rounded-xl">
                          <BookOpen className="w-4 h-4" />
                        </div>
                        <div>
                          <h5 className="text-sm font-bold text-slate-800 group-hover:text-purple-700 transition-colors">Previous Year Papers (PYQs)</h5>
                          <p className="text-xs text-slate-500 font-medium">Search for past question papers and answer keys</p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-purple-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                    </a>
                  </div>
`;

content = content.replace('                </div>\n\n              </div>\n            </div>', resourcesSection + '\n                </div>\n              </div>\n            </div>');
fs.writeFileSync('src/components/ExamsDirectory.tsx', content);
