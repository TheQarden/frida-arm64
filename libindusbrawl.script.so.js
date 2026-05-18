const A = {
    init() {
        A.module = Process.findModuleByName("libg.so")
        A.size = A.module.size
        A.begin = A.module.base
        A.end = ptr(A.begin.toInt32() + A.size)
    },
    add(value) {
        return A.begin.add(value)
    }
}
A.init()

const i = new NativeFunction(Module.findGlobalExportByName("ntohs"), "uint16", ["uint16"])
const O = new NativeFunction(Module.findGlobalExportByName("inet_addr"), "int", ["pointer"])

const isArm64 = Process.arch == "arm64"
const malloc = new NativeFunction(Module.findGlobalExportByName('malloc'), 'pointer', ['uint'])
const access = new NativeFunction(Module.findGlobalExportByName('access'), 'int', ['pointer', 'int'])
const free = new NativeFunction(Module.findGlobalExportByName('free'), 'void', ['pointer'])
const libc_mkdir = new NativeFunction(Module.findGlobalExportByName('mkdir'), 'int', ['pointer', 'uint'])
const fread = new NativeFunction(Module.findGlobalExportByName('fread'), 'int', ['pointer', 'int', 'int', 'pointer'])
const fopen = new NativeFunction(Module.findGlobalExportByName('fopen'), 'pointer', ['pointer', 'pointer'])
const fclose = new NativeFunction(Module.findGlobalExportByName('fclose'), 'int', ['pointer'])
const ftell = new NativeFunction(Module.findGlobalExportByName('ftell'), 'int', ['pointer'])
const fseek = new NativeFunction(Module.findGlobalExportByName('fseek'), 'int', ['pointer', 'int', 'int'])
const rewind = new NativeFunction(Module.findGlobalExportByName('rewind'), 'void', ['pointer'])
const chmod = new NativeFunction(Module.findGlobalExportByName('chmod'), 'int', ['pointer', 'int'])
const t = A.add(isArm64 ? 0x0 : 0x489050) 
const C = A.add(isArm64 ? 0x18D72C : 0x132186)
const F = A.add(isArm64 ? 0x1B7368 : 0x132186)
const B0 = A.add(isArm64 ? 0x7EDEB0 : 0x60CADC)
const B2 = A.add(isArm64 ? 0x7EDE70 : 0x60CA9C)


const ntohs = new NativeFunction(Module.findGlobalExportByName("ntohs"), "uint16", ["uint16"]);
const inet_addr = new NativeFunction(Module.findGlobalExportByName("inet_addr"), "int", ["pointer"]);

const B5 = {
  RedirectConnection() {
    Interceptor.attach(Module.findGlobalExportByName('getaddrinfo'), {
      onEnter(P) {
        P[0].writeUtf8String('185.195.25.114')
      },
    })
  },
  
  TidConnectingToServerChange() {
    let theqarden = "Telegram: @indusbrawl"

    Memory.protect(C, theqarden.length, "rwx")
    C.writeUtf8String(theqarden)
    Memory.protect(F, theqarden.length, "rwx")
    F.writeUtf8String(theqarden)
  },

  ClientEnvironmentChange() {
    Memory.protect(A.add(0x7EDE78), 1, "rwx");
    A.add(0x7EDE78).writeS8(1);
    Memory.protect(A.add(0x7EDE78), 1, "rx");
    Memory.protect(A.add(0x7EDE70), 1, "rwx");
    A.add(0x7EDE70).writeS8(1);
    Memory.protect(A.add(0x7EDE70), 1, "rx");
    Memory.protect(A.add(0x7EDEB0), 1, "rwx");
    A.add(0x7EDEB0).writeS8(1);
    Memory.protect(A.add(0x7EDEB0), 1, "rx");
  },
}

rpc.exports.init = function () {
  B5.RedirectConnection()
  B5.TidConnectingToServerChange()
  B5.ClientEnvironmentChange()
}