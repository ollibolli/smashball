var b2Settings = {};
b2Settings.USHRT_MAX = 65535;
b2Settings.b2_pi = Math.PI;
b2Settings.b2_massUnitsPerKilogram = 1;
b2Settings.b2_timeUnitsPerSecond = 1;
b2Settings.b2_lengthUnitsPerMeter = 200;
b2Settings.b2_maxManifoldPoints = 2;
b2Settings.b2_maxShapesPerBody = 64;
b2Settings.b2_maxPolyVertices = 8;
b2Settings.b2_maxProxies = 1024;
b2Settings.b2_maxPairs = 8 * b2Settings.b2_maxProxies;
b2Settings.b2_linearSlop = 0.005 * b2Settings.b2_lengthUnitsPerMeter;
b2Settings.b2_angularSlop = 2 / 180 * b2Settings.b2_pi;
b2Settings.b2_velocityThreshold = 1 * b2Settings.b2_lengthUnitsPerMeter / b2Settings.b2_timeUnitsPerSecond;
b2Settings.b2_maxLinearCorrection = 0.2 * b2Settings.b2_lengthUnitsPerMeter;
b2Settings.b2_maxAngularCorrection = 8 / 180 * b2Settings.b2_pi;
b2Settings.b2_contactBaumgarte = 0.2;
b2Settings.b2_timeToSleep = 0.5 * b2Settings.b2_timeUnitsPerSecond;
b2Settings.b2_linearSleepTolerance = 0.01 * b2Settings.b2_lengthUnitsPerMeter / b2Settings.b2_timeUnitsPerSecond;
b2Settings.b2_angularSleepTolerance = 2 / 180 / b2Settings.b2_timeUnitsPerSecond;
var b2Vec2 = function(a, b) {
    this.x = a;
    this.y = b
};
b2Vec2.prototype = {SetZero:function() {
    this.x = 0;
    this.y = 0
},Set:function(a, b) {
    this.x = a;
    this.y = b
},SetV:function(a) {
    this.x = a.x;
    this.y = a.y
},Negative:function() {
    return new b2Vec2(-this.x, -this.y)
},Copy:function() {
    return new b2Vec2(this.x, this.y)
},Add:function(a) {
    this.x += a.x;
    this.y += a.y
},Subtract:function(a) {
    this.x -= a.x;
    this.y -= a.y
},Multiply:function(b) {
    this.x *= b;
    this.y *= b
},MulM:function(b) {
    var a = this.x;
    this.x = b.col1.x * a + b.col2.x * this.y;
    this.y = b.col1.y * a + b.col2.y * this.y
},MulTM:function(b) {
    var a = b2Math.b2Dot(this, b.col1);
    this.y = b2Math.b2Dot(this, b.col2);
    this.x = a
},CrossVF:function(b) {
    var a = this.x;
    this.x = b * this.y;
    this.y = -b * a
},CrossFV:function(b) {
    var a = this.x;
    this.x = -b * this.y;
    this.y = b * a
},MinV:function(a) {
    this.x = this.x < a.x ? this.x : a.x;
    this.y = this.y < a.y ? this.y : a.y
},MaxV:function(a) {
    this.x = this.x > a.x ? this.x : a.x;
    this.y = this.y > a.y ? this.y : a.y
},Abs:function() {
    this.x = Math.abs(this.x);
    this.y = Math.abs(this.y)
},Length:function() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
},Normalize:function() {
    var b = this.Length();
    if (b < Number.MIN_VALUE) {
        return 0
    }
    var a = 1 / b;
    this.x *= a;
    this.y *= a;
    return b
},IsValid:function() {
    return b2Math.b2IsValid(this.x) && b2Math.b2IsValid(this.y)
},x:null,y:null};
var b2Mat22 = function(e, d, a) {
    if (e == null) {
        e = 0
    }
    this.col1 = new b2Vec2();
    this.col2 = new b2Vec2();
    if (d != null && a != null) {
        this.col1.SetV(d);
        this.col2.SetV(a)
    } else {
        var f = Math.cos(e);
        var b = Math.sin(e);
        this.col1.x = f;
        this.col2.x = -b;
        this.col1.y = b;
        this.col2.y = f
    }
};
b2Mat22.prototype = {Set:function(b) {
    var d = Math.cos(b);
    var a = Math.sin(b);
    this.col1.x = d;
    this.col2.x = -a;
    this.col1.y = a;
    this.col2.y = d
},SetVV:function(b, a) {
    this.col1.SetV(b);
    this.col2.SetV(a)
},Copy:function() {
    return new b2Mat22(0, this.col1, this.col2)
},SetM:function(a) {
    this.col1.SetV(a.col1);
    this.col2.SetV(a.col2)
},AddM:function(a) {
    this.col1.x += a.col1.x;
    this.col1.y += a.col1.y;
    this.col2.x += a.col2.x;
    this.col2.y += a.col2.y
},SetIdentity:function() {
    this.col1.x = 1;
    this.col2.x = 0;
    this.col1.y = 0;
    this.col2.y = 1
},SetZero:function() {
    this.col1.x = 0;
    this.col2.x = 0;
    this.col1.y = 0;
    this.col2.y = 0
},Invert:function(g) {
    var f = this.col1.x;
    var e = this.col2.x;
    var j = this.col1.y;
    var i = this.col2.y;
    var h = f * i - e * j;
    h = 1 / h;
    g.col1.x = h * i;
    g.col2.x = -h * e;
    g.col1.y = -h * j;
    g.col2.y = h * f;
    return g
},Solve:function(e, h, g) {
    var b = this.col1.x;
    var a = this.col2.x;
    var d = this.col1.y;
    var c = this.col2.y;
    var f = b * c - a * d;
    f = 1 / f;
    e.x = f * (c * h - a * g);
    e.y = f * (b * g - d * h);
    return e
},Abs:function() {
    this.col1.Abs();
    this.col2.Abs()
},col1:new b2Vec2(),col2:new b2Vec2()};
var b2Math = {};
b2Math.b2IsValid = function(a) {
    return isFinite(a)
};
b2Math.b2Dot = function(d, c) {
    return d.x * c.x + d.y * c.y
};
b2Math.b2CrossVV = function(d, c) {
    return d.x * c.y - d.y * c.x
};
b2Math.b2CrossVF = function(b, d) {
    var c = new b2Vec2(d * b.y, -d * b.x);
    return c
};
b2Math.b2CrossFV = function(d, b) {
    var c = new b2Vec2(-d * b.y, d * b.x);
    return c
};
b2Math.b2MulMV = function(a, b) {
    var c = new b2Vec2(a.col1.x * b.x + a.col2.x * b.y, a.col1.y * b.x + a.col2.y * b.y);
    return c
};
b2Math.b2MulTMV = function(a, b) {
    var c = new b2Vec2(b2Math.b2Dot(b, a.col1), b2Math.b2Dot(b, a.col2));
    return c
};
b2Math.AddVV = function(d, c) {
    var e = new b2Vec2(d.x + c.x, d.y + c.y);
    return e
};
b2Math.SubtractVV = function(d, c) {
    var e = new b2Vec2(d.x - c.x, d.y - c.y);
    return e
};
b2Math.MulFV = function(d, b) {
    var c = new b2Vec2(d * b.x, d * b.y);
    return c
};
b2Math.AddMM = function(a, c) {
    var b = new b2Mat22(0, b2Math.AddVV(a.col1, c.col1), b2Math.AddVV(a.col2, c.col2));
    return b
};
b2Math.b2MulMM = function(a, c) {
    var b = new b2Mat22(0, b2Math.b2MulMV(a, c.col1), b2Math.b2MulMV(a, c.col2));
    return b
};
b2Math.b2MulTMM = function(a, e) {
    var c = new b2Vec2(b2Math.b2Dot(a.col1, e.col1), b2Math.b2Dot(a.col2, e.col1));
    var b = new b2Vec2(b2Math.b2Dot(a.col1, e.col2), b2Math.b2Dot(a.col2, e.col2));
    var d = new b2Mat22(0, c, b);
    return d
};
b2Math.b2Abs = function(b) {
    return b > 0 ? b : -b
};
b2Math.b2AbsV = function(d) {
    var c = new b2Vec2(b2Math.b2Abs(d.x), b2Math.b2Abs(d.y));
    return c
};
b2Math.b2AbsM = function(a) {
    var b = new b2Mat22(0, b2Math.b2AbsV(a.col1), b2Math.b2AbsV(a.col2));
    return b
};
b2Math.b2Min = function(d, c) {
    return d < c ? d : c
};
b2Math.b2MinV = function(e, d) {
    var f = new b2Vec2(b2Math.b2Min(e.x, d.x), b2Math.b2Min(e.y, d.y));
    return f
};
b2Math.b2Max = function(d, c) {
    return d > c ? d : c
};
b2Math.b2MaxV = function(e, d) {
    var f = new b2Vec2(b2Math.b2Max(e.x, d.x), b2Math.b2Max(e.y, d.y));
    return f
};
b2Math.b2Clamp = function(c, b, d) {
    return b2Math.b2Max(b, b2Math.b2Min(c, d))
};
b2Math.b2ClampV = function(c, b, d) {
    return b2Math.b2MaxV(b, b2Math.b2MinV(c, d))
};
b2Math.b2Swap = function(d, c) {
    var e = d[0];
    d[0] = c[0];
    c[0] = e
};
b2Math.b2Random = function() {
    return Math.random() * 2 - 1
};
b2Math.b2NextPowerOfTwo = function(a) {
    a |= (a >> 1) & 2147483647;
    a |= (a >> 2) & 1073741823;
    a |= (a >> 4) & 268435455;
    a |= (a >> 8) & 16777215;
    a |= (a >> 16) & 65535;
    return a + 1
};
b2Math.b2IsPowerOfTwo = function(b) {
    var a = b > 0 && (b & (b - 1)) == 0;
    return a
};
b2Math.tempVec2 = new b2Vec2();
b2Math.tempVec3 = new b2Vec2();
b2Math.tempVec4 = new b2Vec2();
b2Math.tempVec5 = new b2Vec2();
b2Math.tempMat = new b2Mat22();
var b2AABB = function() {
    this.minVertex = new b2Vec2();
    this.maxVertex = new b2Vec2()
};
b2AABB.prototype = {IsValid:function() {
    var b = this.maxVertex.x;
    var a = this.maxVertex.y;
    b = this.maxVertex.x;
    a = this.maxVertex.y;
    b -= this.minVertex.x;
    a -= this.minVertex.y;
    var c = b >= 0 && a >= 0;
    c = c && this.minVertex.IsValid() && this.maxVertex.IsValid();
    return c
},minVertex:new b2Vec2(),maxVertex:new b2Vec2()};
var b2Bound = function() {
};
b2Bound.prototype = {IsLower:function() {
    return(this.value & 1) == 0
},IsUpper:function() {
    return(this.value & 1) == 1
},Swap:function(c) {
    var e = this.value;
    var d = this.proxyId;
    var a = this.stabbingCount;
    this.value = c.value;
    this.proxyId = c.proxyId;
    this.stabbingCount = c.stabbingCount;
    c.value = e;
    c.proxyId = d;
    c.stabbingCount = a
},value:0,proxyId:0,stabbingCount:0};
var b2BoundValues = function() {
    this.lowerValues = [0,0];
    this.upperValues = [0,0]
};
b2BoundValues.prototype = {lowerValues:[0,0],upperValues:[0,0]};
var b2Pair = function() {
};
b2Pair.prototype = {SetBuffered:function() {
    this.status |= b2Pair.e_pairBuffered
},ClearBuffered:function() {
    this.status &= ~b2Pair.e_pairBuffered
},IsBuffered:function() {
    return(this.status & b2Pair.e_pairBuffered) == b2Pair.e_pairBuffered
},SetRemoved:function() {
    this.status |= b2Pair.e_pairRemoved
},ClearRemoved:function() {
    this.status &= ~b2Pair.e_pairRemoved
},IsRemoved:function() {
    return(this.status & b2Pair.e_pairRemoved) == b2Pair.e_pairRemoved
},SetFinal:function() {
    this.status |= b2Pair.e_pairFinal
},IsFinal:function() {
    return(this.status & b2Pair.e_pairFinal) == b2Pair.e_pairFinal
},userData:null,proxyId1:0,proxyId2:0,next:0,status:0};
b2Pair.b2_nullPair = b2Settings.USHRT_MAX;
b2Pair.b2_nullProxy = b2Settings.USHRT_MAX;
b2Pair.b2_tableCapacity = b2Settings.b2_maxPairs;
b2Pair.b2_tableMask = b2Pair.b2_tableCapacity - 1;
b2Pair.e_pairBuffered = 1;
b2Pair.e_pairRemoved = 2;
b2Pair.e_pairFinal = 4;
var b2PairCallback = function() {
};
b2PairCallback.prototype = {PairAdded:function(b, a) {
    return null
},PairRemoved:function(c, b, a) {
},};
var b2BufferedPair = function() {
};
b2BufferedPair.prototype = {proxyId1:0,proxyId2:0};
var b2PairManager = function() {
    var a = 0;
    this.m_hashTable = new Array(b2Pair.b2_tableCapacity);
    for (a = b2Pair.b2_tableCapacity; a--;) {
        this.m_hashTable[a] = b2Pair.b2_nullPair
    }
    this.m_pairs = new Array(b2Settings.b2_maxPairs);
    for (a = b2Settings.b2_maxPairs; a--;) {
        this.m_pairs[a] = new b2Pair()
    }
    this.m_pairBuffer = new Array(b2Settings.b2_maxPairs);
    for (a = b2Settings.b2_maxPairs; a--;) {
        this.m_pairBuffer[a] = new b2BufferedPair()
    }
    for (a = 0; a < b2Settings.b2_maxPairs; ++a) {
        this.m_pairs[a].proxyId1 = b2Pair.b2_nullProxy;
        this.m_pairs[a].proxyId2 = b2Pair.b2_nullProxy;
        this.m_pairs[a].userData = null;
        this.m_pairs[a].status = 0;
        this.m_pairs[a].next = (a + 1)
    }
    this.m_pairs[b2Settings.b2_maxPairs - 1].next = b2Pair.b2_nullPair;
    this.m_pairCount = 0
};
b2PairManager.prototype = {Initialize:function(a, b) {
    this.m_broadPhase = a;
    this.m_callback = b
},AddBufferedPair:function(b, a) {
    var c = this.AddPair(b, a);
    if (c.IsBuffered() == false) {
        c.SetBuffered();
        this.m_pairBuffer[this.m_pairBufferCount].proxyId1 = c.proxyId1;
        this.m_pairBuffer[this.m_pairBufferCount].proxyId2 = c.proxyId2;
        ++this.m_pairBufferCount
    }
    c.ClearRemoved();
    if (b2BroadPhase.s_validate) {
        this.ValidateBuffer()
    }
},RemoveBufferedPair:function(b, a) {
    var c = this.Find(b, a);
    if (c == null) {
        return
    }
    if (c.IsBuffered() == false) {
        c.SetBuffered();
        this.m_pairBuffer[this.m_pairBufferCount].proxyId1 = c.proxyId1;
        this.m_pairBuffer[this.m_pairBufferCount].proxyId2 = c.proxyId2;
        ++this.m_pairBufferCount
    }
    c.SetRemoved();
    if (b2BroadPhase.s_validate) {
        this.ValidateBuffer()
    }
},Commit:function() {
    var b = 0;
    var e = 0;
    var a = this.m_broadPhase.m_proxyPool;
    for (b = 0; b < this.m_pairBufferCount; ++b) {
        var f = this.Find(this.m_pairBuffer[b].proxyId1, this.m_pairBuffer[b].proxyId2);
        f.ClearBuffered();
        var d = a[f.proxyId1];
        var c = a[f.proxyId2];
        if (f.IsRemoved()) {
            if (f.IsFinal() == true) {
                this.m_callback.PairRemoved(d.userData, c.userData, f.userData)
            }
            this.m_pairBuffer[e].proxyId1 = f.proxyId1;
            this.m_pairBuffer[e].proxyId2 = f.proxyId2;
            ++e
        } else {
            if (f.IsFinal() == false) {
                f.userData = this.m_callback.PairAdded(d.userData, c.userData);
                f.SetFinal()
            }
        }
    }
    for (b = 0; b < e; ++b) {
        this.RemovePair(this.m_pairBuffer[b].proxyId1, this.m_pairBuffer[b].proxyId2)
    }
    this.m_pairBufferCount = 0;
    if (b2BroadPhase.s_validate) {
        this.ValidateTable()
    }
},AddPair:function(b, a) {
    if (b > a) {
        var c = b;
        b = a;
        a = c
    }
    var d = b2PairManager.Hash(b, a) & b2Pair.b2_tableMask;
    var f = f = this.FindHash(b, a, d);
    if (f != null) {
        return f
    }
    var e = this.m_freePair;
    f = this.m_pairs[e];
    this.m_freePair = f.next;
    f.proxyId1 = b;
    f.proxyId2 = a;
    f.status = 0;
    f.userData = null;
    f.next = this.m_hashTable[d];
    this.m_hashTable[d] = e;
    ++this.m_pairCount;
    return f
},RemovePair:function(g, f) {
    if (g > f) {
        var i = g;
        g = f;
        f = i
    }
    var d = b2PairManager.Hash(g, f) & b2Pair.b2_tableMask;
    var b = this.m_hashTable[d];
    var h = null;
    while (b != b2Pair.b2_nullPair) {
        if (b2PairManager.Equals(this.m_pairs[b], g, f)) {
            var e = b;
            if (h) {
                h.next = this.m_pairs[b].next
            } else {
                this.m_hashTable[d] = this.m_pairs[b].next
            }
            var c = this.m_pairs[e];
            var a = c.userData;
            c.next = this.m_freePair;
            c.proxyId1 = b2Pair.b2_nullProxy;
            c.proxyId2 = b2Pair.b2_nullProxy;
            c.userData = null;
            c.status = 0;
            this.m_freePair = e;
            --this.m_pairCount;
            return a
        } else {
            h = this.m_pairs[b];
            b = h.next
        }
    }
    return null
},Find:function(b, a) {
    if (b > a) {
        var c = b;
        b = a;
        a = c
    }
    var d = b2PairManager.Hash(b, a) & b2Pair.b2_tableMask;
    return this.FindHash(b, a, d)
},FindHash:function(b, a, d) {
    var c = this.m_hashTable[d];
    while (c != b2Pair.b2_nullPair && b2PairManager.Equals(this.m_pairs[c], b, a) == false) {
        c = this.m_pairs[c].next
    }
    if (c == b2Pair.b2_nullPair) {
        return null
    }
    return this.m_pairs[c]
},ValidateBuffer:function() {
},ValidateTable:function() {
},m_broadPhase:null,m_callback:null,m_pairs:null,m_freePair:0,m_pairCount:0,m_pairBuffer:null,m_pairBufferCount:0,m_hashTable:null};
b2PairManager.Hash = function(b, a) {
    var c = ((a << 16) & 4294901760) | b;
    c = ~c + ((c << 15) & 4294934528);
    c = c ^ ((c >> 12) & 1048575);
    c = c + ((c << 2) & 4294967292);
    c = c ^ ((c >> 4) & 268435455);
    c = c * 2057;
    c = c ^ ((c >> 16) & 65535);
    return c
};
b2PairManager.Equals = function(c, b, a) {
    return(c.proxyId1 == b && c.proxyId2 == a)
};
b2PairManager.EqualsPair = function(b, a) {
    return b.proxyId1 == a.proxyId1 && b.proxyId2 == a.proxyId2
};
var b2BroadPhase = function(f, g) {
    this.m_pairManager = new b2PairManager();
    this.m_proxyPool = new Array(b2Settings.b2_maxPairs);
    this.m_bounds = new Array(2 * b2Settings.b2_maxProxies);
    this.m_queryResults = new Array(b2Settings.b2_maxProxies);
    this.m_quantizationFactor = new b2Vec2();
    var d = 0;
    this.m_pairManager.Initialize(this, g);
    this.m_worldAABB = f;
    this.m_proxyCount = 0;
    for (d = b2Settings.b2_maxProxies; d--;) {
        this.m_queryResults[d] = 0
    }
    this.m_bounds = new Array(2);
    for (d = 0; d < 2; d++) {
        this.m_bounds[d] = new Array(2 * b2Settings.b2_maxProxies);
        for (var c = 2 * b2Settings.b2_maxProxies; c--;) {
            this.m_bounds[d][c] = new b2Bound()
        }
    }
    var b = f.maxVertex.x;
    var a = f.maxVertex.y;
    b -= f.minVertex.x;
    a -= f.minVertex.y;
    this.m_quantizationFactor.x = b2Settings.USHRT_MAX / b;
    this.m_quantizationFactor.y = b2Settings.USHRT_MAX / a;
    var e;
    for (d = b2Settings.b2_maxProxies - 1; d--;) {
        e = new b2Proxy();
        this.m_proxyPool[d] = e;
        e.SetNext(d + 1);
        e.timeStamp = 0;
        e.overlapCount = b2BroadPhase.b2_invalid;
        e.userData = null
    }
    e = new b2Proxy();
    this.m_proxyPool[b2Settings.b2_maxProxies - 1] = e;
    e.SetNext(b2Pair.b2_nullProxy);
    e.timeStamp = 0;
    e.overlapCount = b2BroadPhase.b2_invalid;
    e.userData = null;
    this.m_freeProxy = 0;
    this.m_timeStamp = 1;
    this.m_queryResultCount = 0
};
b2BroadPhase.prototype = {InRange:function(c) {
    var b;
    var a;
    var e;
    var d;
    b = c.minVertex.x;
    a = c.minVertex.y;
    b -= this.m_worldAABB.maxVertex.x;
    a -= this.m_worldAABB.maxVertex.y;
    e = this.m_worldAABB.minVertex.x;
    d = this.m_worldAABB.minVertex.y;
    e -= c.maxVertex.x;
    d -= c.maxVertex.y;
    b = b2Math.b2Max(b, e);
    a = b2Math.b2Max(a, d);
    return b2Math.b2Max(b, a) < 0
},GetProxy:function(a) {
    if (a == b2Pair.b2_nullProxy || this.m_proxyPool[a].IsValid() == false) {
        return null
    }
    return this.m_proxyPool[a]
},CreateProxy:function(f, h) {
    var d = 0;
    var u;
    var w = this.m_freeProxy;
    u = this.m_proxyPool[w];
    this.m_freeProxy = u.GetNext();
    u.overlapCount = 0;
    u.userData = h;
    var n = 2 * this.m_proxyCount;
    var l = new Array();
    var c = new Array();
    this.ComputeBounds(l, c, f);
    for (var b = 0; b < 2; ++b) {
        var e = this.m_bounds[b];
        var m = 0;
        var r = 0;
        var g = [m];
        var k = [r];
        this.Query(g, k, l[b], c[b], e, n, b);
        m = g[0];
        r = k[0];
        var o = new Array();
        var s = 0;
        var v = n - r;
        var q;
        var p;
        for (s = v; s--;) {
            o[s] = new b2Bound();
            q = o[s];
            p = e[r + s];
            q.value = p.value;
            q.proxyId = p.proxyId;
            q.stabbingCount = p.stabbingCount
        }
        v = o.length;
        var x = r + 2;
        for (s = v; s--;) {
            p = o[s];
            q = e[x + s];
            q.value = p.value;
            q.proxyId = p.proxyId;
            q.stabbingCount = p.stabbingCount
        }
        o = new Array();
        v = r - m;
        for (s = v; s--;) {
            o[s] = new b2Bound();
            q = o[s];
            p = e[m + s];
            q.value = p.value;
            q.proxyId = p.proxyId;
            q.stabbingCount = p.stabbingCount
        }
        v = o.length;
        x = m + 1;
        for (s = v; s--;) {
            p = o[s];
            q = e[x + s];
            q.value = p.value;
            q.proxyId = p.proxyId;
            q.stabbingCount = p.stabbingCount
        }
        ++r;
        e[m].value = l[b];
        e[m].proxyId = w;
        e[r].value = c[b];
        e[r].proxyId = w;
        e[m].stabbingCount = m == 0 ? 0 : e[m - 1].stabbingCount;
        e[r].stabbingCount = e[r - 1].stabbingCount;
        for (d = m; d < r; ++d) {
            e[d].stabbingCount++
        }
        for (d = m; d < n + 2; ++d) {
            var a = this.m_proxyPool[e[d].proxyId];
            if (e[d].IsLower()) {
                a.lowerBounds[b] = d
            } else {
                a.upperBounds[b] = d
            }
        }
    }
    ++this.m_proxyCount;
    for (var t = 0; t < this.m_queryResultCount; ++t) {
        this.m_pairManager.AddBufferedPair(w, this.m_queryResults[t])
    }
    this.m_pairManager.Commit();
    this.m_queryResultCount = 0;
    this.IncrementTimeStamp();
    return w
},DestroyProxy:function(s) {
    var q = this.m_proxyPool[s];
    var h = 2 * this.m_proxyCount;
    for (var c = 0; c < 2; ++c) {
        var f = this.m_bounds[c];
        var g = q.lowerBounds[c];
        var n = q.upperBounds[c];
        var u = f[g].value;
        var a = f[n].value;
        var k = new Array();
        var o = 0;
        var r = n - g - 1;
        var m;
        var l;
        for (o = r; o--;) {
            k[o] = new b2Bound();
            m = k[o];
            l = f[g + 1 + o];
            m.value = l.value;
            m.proxyId = l.proxyId;
            m.stabbingCount = l.stabbingCount
        }
        r = k.length;
        var t = g;
        for (o = r; o--;) {
            l = k[o];
            m = f[t + o];
            m.value = l.value;
            m.proxyId = l.proxyId;
            m.stabbingCount = l.stabbingCount
        }
        k = new Array();
        r = h - n - 1;
        for (o = r; o--;) {
            k[o] = new b2Bound();
            m = k[o];
            l = f[n + 1 + o];
            m.value = l.value;
            m.proxyId = l.proxyId;
            m.stabbingCount = l.stabbingCount
        }
        r = k.length;
        t = n - 1;
        for (o = r; o--;) {
            l = k[o];
            m = f[t + o];
            m.value = l.value;
            m.proxyId = l.proxyId;
            m.stabbingCount = l.stabbingCount
        }
        r = h - 2;
        for (var e = g; e < r; ++e) {
            var b = this.m_proxyPool[f[e].proxyId];
            if (f[e].IsLower()) {
                b.lowerBounds[c] = e
            } else {
                b.upperBounds[c] = e
            }
        }
        r = n - 1;
        for (var d = g; d < r; ++d) {
            f[d].stabbingCount--
        }
        this.Query([0], [0], u, a, f, h - 2, c)
    }
    for (var p = this.m_queryResultCount; p--;) {
        this.m_pairManager.RemoveBufferedPair(s, this.m_queryResults[p])
    }
    this.m_pairManager.Commit();
    this.m_queryResultCount = 0;
    this.IncrementTimeStamp();
    q.userData = null;
    q.overlapCount = b2BroadPhase.b2_invalid;
    q.lowerBounds[0] = b2BroadPhase.b2_invalid;
    q.lowerBounds[1] = b2BroadPhase.b2_invalid;
    q.upperBounds[0] = b2BroadPhase.b2_invalid;
    q.upperBounds[1] = b2BroadPhase.b2_invalid;
    q.SetNext(this.m_freeProxy);
    this.m_freeProxy = s;
    --this.m_proxyCount
},MoveProxy:function(p, i) {
    var d = 0;
    var g = 0;
    var a;
    var c;
    var e;
    var j = 0;
    var r;
    if (p == b2Pair.b2_nullProxy || b2Settings.b2_maxProxies <= p) {
        return
    }
    if (i.IsValid() == false) {
        return
    }
    var l = 2 * this.m_proxyCount;
    var n = this.m_proxyPool[p];
    var f = new b2BoundValues();
    this.ComputeBounds(f.lowerValues, f.upperValues, i);
    var s = new b2BoundValues();
    for (d = 0; d < 2; ++d) {
        s.lowerValues[d] = this.m_bounds[d][n.lowerBounds[d]].value;
        s.upperValues[d] = this.m_bounds[d][n.upperBounds[d]].value
    }
    for (d = 0; d < 2; ++d) {
        var h = this.m_bounds[d];
        var k = n.lowerBounds[d];
        var m = n.upperBounds[d];
        var t = f.lowerValues[d];
        var b = f.upperValues[d];
        var v = t - h[k].value;
        var q = b - h[m].value;
        h[k].value = t;
        h[m].value = b;
        if (v < 0) {
            g = k;
            while (g > 0 && t < h[g - 1].value) {
                a = h[g];
                c = h[g - 1];
                var u = c.proxyId;
                var o = this.m_proxyPool[c.proxyId];
                c.stabbingCount++;
                if (c.IsUpper() == true) {
                    if (this.TestOverlap(f, o)) {
                        this.m_pairManager.AddBufferedPair(p, u)
                    }
                    o.upperBounds[d]++;
                    a.stabbingCount++
                } else {
                    o.lowerBounds[d]++;
                    a.stabbingCount--
                }
                n.lowerBounds[d]--;
                a.Swap(c);
                --g
            }
        }
        if (q > 0) {
            g = m;
            while (g < l - 1 && h[g + 1].value <= b) {
                a = h[g];
                e = h[g + 1];
                j = e.proxyId;
                r = this.m_proxyPool[j];
                e.stabbingCount++;
                if (e.IsLower() == true) {
                    if (this.TestOverlap(f, r)) {
                        this.m_pairManager.AddBufferedPair(p, j)
                    }
                    r.lowerBounds[d]--;
                    a.stabbingCount++
                } else {
                    r.upperBounds[d]--;
                    a.stabbingCount--
                }
                n.upperBounds[d]++;
                a.Swap(e);
                g++
            }
        }
        if (v > 0) {
            g = k;
            while (g < l - 1 && h[g + 1].value <= t) {
                a = h[g];
                e = h[g + 1];
                j = e.proxyId;
                r = this.m_proxyPool[j];
                e.stabbingCount--;
                if (e.IsUpper()) {
                    if (this.TestOverlap(s, r)) {
                        this.m_pairManager.RemoveBufferedPair(p, j)
                    }
                    r.upperBounds[d]--;
                    a.stabbingCount--
                } else {
                    r.lowerBounds[d]--;
                    a.stabbingCount++
                }
                n.lowerBounds[d]++;
                a.Swap(e);
                g++
            }
        }
        if (q < 0) {
            g = m;
            while (g > 0 && b < h[g - 1].value) {
                a = h[g];
                c = h[g - 1];
                u = c.proxyId;
                o = this.m_proxyPool[u];
                c.stabbingCount--;
                if (c.IsLower() == true) {
                    if (this.TestOverlap(s, o)) {
                        this.m_pairManager.RemoveBufferedPair(p, u)
                    }
                    o.lowerBounds[d]++;
                    a.stabbingCount--
                } else {
                    o.upperBounds[d]++;
                    a.stabbingCount++
                }
                n.upperBounds[d]--;
                a.Swap(c);
                g--
            }
        }
    }
},Commit:function() {
    this.m_pairManager.Commit()
},QueryAABB:function(e, b, c) {
    var h = new Array();
    var f = new Array();
    this.ComputeBounds(h, f, e);
    var a = 0;
    var i = 0;
    var d = [a];
    var k = [i];
    this.Query(d, k, h[0], f[0], this.m_bounds[0], 2 * this.m_proxyCount, 0);
    this.Query(d, k, h[1], f[1], this.m_bounds[1], 2 * this.m_proxyCount, 1);
    for (var g = 0; g < this.m_queryResultCount && g < c; ++g) {
        var j = this.m_proxyPool[this.m_queryResults[g]];
        b[g] = j.userData
    }
    this.m_queryResultCount = 0;
    this.IncrementTimeStamp();
    return g
},Validate:function() {
    var f;
    var e;
    var c;
    var j;
    for (var b = 0; b < 2; ++b) {
        var a = this.m_bounds[b];
        var k = 2 * this.m_proxyCount;
        var h = 0;
        for (var g = k; g--;) {
            var d = a[g];
            if (d.IsLower() == true) {
                h++
            } else {
                h--
            }
        }
    }
},ComputeBounds:function(d, g, a) {
    var c = a.minVertex.x;
    var b = a.minVertex.y;
    c = b2Math.b2Min(c, this.m_worldAABB.maxVertex.x);
    b = b2Math.b2Min(b, this.m_worldAABB.maxVertex.y);
    c = b2Math.b2Max(c, this.m_worldAABB.minVertex.x);
    b = b2Math.b2Max(b, this.m_worldAABB.minVertex.y);
    var f = a.maxVertex.x;
    var e = a.maxVertex.y;
    f = b2Math.b2Min(f, this.m_worldAABB.maxVertex.x);
    e = b2Math.b2Min(e, this.m_worldAABB.maxVertex.y);
    f = b2Math.b2Max(f, this.m_worldAABB.minVertex.x);
    e = b2Math.b2Max(e, this.m_worldAABB.minVertex.y);
    d[0] = (this.m_quantizationFactor.x * (c - this.m_worldAABB.minVertex.x)) & (b2Settings.USHRT_MAX - 1);
    g[0] = ((this.m_quantizationFactor.x * (f - this.m_worldAABB.minVertex.x)) & 65535) | 1;
    d[1] = (this.m_quantizationFactor.y * (b - this.m_worldAABB.minVertex.y)) & (b2Settings.USHRT_MAX - 1);
    g[1] = ((this.m_quantizationFactor.y * (e - this.m_worldAABB.minVertex.y)) & 65535) | 1
},TestOverlapValidate:function(d, c) {
    for (var a = 0; a < 2; ++a) {
        var b = this.m_bounds[a];
        if (b[d.lowerBounds[a]].value > b[c.upperBounds[a]].value) {
            return false
        }
        if (b[d.upperBounds[a]].value < b[c.lowerBounds[a]].value) {
            return false
        }
    }
    return true
},TestOverlap:function(a, e) {
    for (var c = 0; c < 2; ++c) {
        var d = this.m_bounds[c];
        if (a.lowerValues[c] > d[e.upperBounds[c]].value) {
            return false
        }
        if (a.upperValues[c] < d[e.lowerBounds[c]].value) {
            return false
        }
    }
    return true
},Query:function(h, d, f, m, a, o, b) {
    var c = b2BroadPhase.BinarySearch(a, o, f);
    var l = b2BroadPhase.BinarySearch(a, o, m);
    for (var e = c; e < l; ++e) {
        if (a[e].IsLower()) {
            this.IncrementOverlapCount(a[e].proxyId)
        }
    }
    if (c > 0) {
        var g = c - 1;
        var n = a[g].stabbingCount;
        while (n) {
            if (a[g].IsLower()) {
                var k = this.m_proxyPool[a[g].proxyId];
                if (c <= k.upperBounds[b]) {
                    this.IncrementOverlapCount(a[g].proxyId);
                    --n
                }
            }
            --g
        }
    }
    h[0] = c;
    d[0] = l
},IncrementOverlapCount:function(b) {
    var a = this.m_proxyPool[b];
    if (a.timeStamp < this.m_timeStamp) {
        a.timeStamp = this.m_timeStamp;
        a.overlapCount = 1
    } else {
        a.overlapCount = 2;
        this.m_queryResults[this.m_queryResultCount] = b;
        ++this.m_queryResultCount
    }
},IncrementTimeStamp:function() {
    if (this.m_timeStamp == b2Settings.USHRT_MAX) {
        for (var a = b2Settings.b2_maxProxies; a--;) {
            this.m_proxyPool[a].timeStamp = 0
        }
        this.m_timeStamp = 1
    } else {
        ++this.m_timeStamp
    }
},m_pairManager:new b2PairManager(),m_proxyPool:new Array(b2Settings.b2_maxPairs),m_freeProxy:0,m_bounds:new Array(2 * b2Settings.b2_maxProxies),m_queryResults:new Array(b2Settings.b2_maxProxies),m_queryResultCount:0,m_worldAABB:null,m_quantizationFactor:new b2Vec2(),m_proxyCount:0,m_timeStamp:0};
b2BroadPhase.s_validate = false;
b2BroadPhase.b2_invalid = b2Settings.USHRT_MAX;
b2BroadPhase.b2_nullEdge = b2Settings.USHRT_MAX;
b2BroadPhase.BinarySearch = function(d, c, f) {
    var a = 0;
    var e = c - 1;
    while (a <= e) {
        var b = Math.floor((a + e) / 2);
        if (d[b].value > f) {
            e = b - 1
        } else {
            if (d[b].value < f) {
                a = b + 1
            } else {
                return(b)
            }
        }
    }
    return(a)
};
var b2Collision = function() {
};
b2Collision.prototype = {};
b2Collision.b2_nullFeature = 255;
b2Collision.ClipSegmentToLine = function(f, b, e, a) {
    var c = 0;
    var i = b[0].v;
    var h = b[1].v;
    var g = b2Math.b2Dot(e, b[0].v) - a;
    var d = b2Math.b2Dot(e, b[1].v) - a;
    if (g <= 0) {
        f[c++] = b[0]
    }
    if (d <= 0) {
        f[c++] = b[1]
    }
    if (g * d < 0) {
        var j = g / (g - d);
        var k = f[c].v;
        k.x = i.x + j * (h.x - i.x);
        k.y = i.y + j * (h.y - i.y);
        if (g > 0) {
            f[c].id = b[0].id
        } else {
            f[c].id = b[1].id
        }
        ++c
    }
    return c
};
b2Collision.EdgeSeparation = function(p, q, o) {
    var f = p.m_vertices;
    var g = o.m_vertexCount;
    var r = o.m_vertices;
    var e = p.m_normals[q].x;
    var d = p.m_normals[q].y;
    var s = e;
    var l = p.m_R;
    e = l.col1.x * s + l.col2.x * d;
    d = l.col1.y * s + l.col2.y * d;
    var v = e;
    var u = d;
    l = o.m_R;
    s = v * l.col1.x + u * l.col1.y;
    u = v * l.col2.x + u * l.col2.y;
    v = s;
    var n = 0;
    var m = Number.MAX_VALUE;
    for (var w = g; w--;) {
        var c = r[w];
        var t = c.x * v + c.y * u;
        if (t < m) {
            m = t;
            n = w
        }
    }
    l = p.m_R;
    var b = p.m_position.x + (l.col1.x * f[q].x + l.col2.x * f[q].y);
    var a = p.m_position.y + (l.col1.y * f[q].x + l.col2.y * f[q].y);
    l = o.m_R;
    var k = o.m_position.x + (l.col1.x * r[n].x + l.col2.x * r[n].y);
    var h = o.m_position.y + (l.col1.y * r[n].x + l.col2.y * r[n].y);
    k -= b;
    h -= a;
    var j = k * e + h * d;
    return j
};
b2Collision.FindMaxSeparation = function(r, m, l, w) {
    var j = m.m_vertexCount;
    var d = l.m_position.x - m.m_position.x;
    var c = l.m_position.y - m.m_position.y;
    var f = (d * m.m_R.col1.x + c * m.m_R.col1.y);
    var e = (d * m.m_R.col2.x + c * m.m_R.col2.y);
    var h = 0;
    var a = -Number.MAX_VALUE;
    for (var p = j; p--;) {
        var o = (m.m_normals[p].x * f + m.m_normals[p].y * e);
        if (o > a) {
            a = o;
            h = p
        }
    }
    var n = b2Collision.EdgeSeparation(m, h, l);
    if (n > 0 && w == false) {
        return n
    }
    var g = h - 1 >= 0 ? h - 1 : j - 1;
    var t = b2Collision.EdgeSeparation(m, g, l);
    if (t > 0 && w == false) {
        return t
    }
    var q = h + 1 < j ? h + 1 : 0;
    var u = b2Collision.EdgeSeparation(m, q, l);
    if (u > 0 && w == false) {
        return u
    }
    var b = 0;
    var k;
    var v = 0;
    if (t > n && t > u) {
        v = -1;
        b = g;
        k = t
    } else {
        if (u > n) {
            v = 1;
            b = q;
            k = u
        } else {
            r[0] = h;
            return n
        }
    }
    while (true) {
        if (v == -1) {
            h = b - 1 >= 0 ? b - 1 : j - 1
        } else {
            h = b + 1 < j ? b + 1 : 0
        }
        n = b2Collision.EdgeSeparation(m, h, l);
        if (n > 0 && w == false) {
            return n
        }
        if (n > k) {
            b = h;
            k = n
        } else {
            break
        }
    }
    r[0] = b;
    return k
};
b2Collision.FindIncidentEdge = function(D, p, q, n) {
    var h = p.m_vertexCount;
    var f = p.m_vertices;
    var g = n.m_vertexCount;
    var s = n.m_vertices;
    var a = q;
    var F = q + 1 == h ? 0 : q + 1;
    var e = f[F];
    var C = e.x;
    var A = e.y;
    e = f[a];
    C -= e.x;
    A -= e.y;
    var v = C;
    C = A;
    A = -v;
    var E = 1 / Math.sqrt(C * C + A * A);
    C *= E;
    A *= E;
    var r = C;
    var o = A;
    v = r;
    var l = p.m_R;
    r = l.col1.x * v + l.col2.x * o;
    o = l.col1.y * v + l.col2.y * o;
    var d = r;
    var b = o;
    l = n.m_R;
    v = d * l.col1.x + b * l.col1.y;
    b = d * l.col2.x + b * l.col2.y;
    d = v;
    var k = 0;
    var j = 0;
    var m = Number.MAX_VALUE;
    for (var B = g; B--;) {
        var z = B;
        var y = B + 1 < g ? B + 1 : 0;
        e = s[y];
        var u = e.x;
        var t = e.y;
        e = s[z];
        u -= e.x;
        t -= e.y;
        v = u;
        u = t;
        t = -v;
        E = 1 / Math.sqrt(u * u + t * t);
        u *= E;
        t *= E;
        var w = u * d + t * b;
        if (w < m) {
            m = w;
            k = z;
            j = y
        }
    }
    var x;
    x = D[0];
    e = x.v;
    e.SetV(s[k]);
    e.MulM(n.m_R);
    e.Add(n.m_position);
    x.id.features.referenceFace = q;
    x.id.features.incidentEdge = k;
    x.id.features.incidentVertex = k;
    x = D[1];
    e = x.v;
    e.SetV(s[j]);
    e.MulM(n.m_R);
    e.Add(n.m_position);
    x.id.features.referenceFace = q;
    x.id.features.incidentEdge = k;
    x.id.features.incidentVertex = j
};
b2Collision.b2CollidePolyTempVec = new b2Vec2();
b2Collision.b2CollidePoly = function(w, k, j, b) {
    w.pointCount = 0;
    var M = 0;
    var G = [M];
    var F = b2Collision.FindMaxSeparation(G, k, j, b);
    M = G[0];
    if (F > 0 && b == false) {
        return
    }
    var K = 0;
    var g = [K];
    var E = b2Collision.FindMaxSeparation(g, j, k, b);
    K = g[0];
    if (E > 0 && b == false) {
        return
    }
    var p;
    var o;
    var a = 0;
    var R = 0;
    var d = 0.98;
    var O = 0.001;
    if (E > d * F + O) {
        p = j;
        o = k;
        a = K;
        R = 1
    } else {
        p = k;
        o = j;
        a = M;
        R = 0
    }
    var c = [new ClipVertex(),new ClipVertex()];
    b2Collision.FindIncidentEdge(c, p, a, o);
    var B = p.m_vertexCount;
    var q = p.m_vertices;
    var I = q[a];
    var H = a + 1 < B ? q[a + 1] : q[0];
    var T = H.x - I.x;
    var S = H.y - I.y;
    var f = H.x - I.x;
    var e = H.y - I.y;
    var h = f;
    var J = p.m_R;
    f = J.col1.x * h + J.col2.x * e;
    e = J.col1.y * h + J.col2.y * e;
    var s = 1 / Math.sqrt(f * f + e * e);
    f *= s;
    e *= s;
    var n = f;
    var m = e;
    h = n;
    n = m;
    m = -h;
    var N = I.x;
    var L = I.y;
    h = N;
    J = p.m_R;
    N = J.col1.x * h + J.col2.x * L;
    L = J.col1.y * h + J.col2.y * L;
    N += p.m_position.x;
    L += p.m_position.y;
    var v = H.x;
    var u = H.y;
    h = v;
    J = p.m_R;
    v = J.col1.x * h + J.col2.x * u;
    u = J.col1.y * h + J.col2.y * u;
    v += p.m_position.x;
    u += p.m_position.y;
    var C = n * N + m * L;
    var A = -(f * N + e * L);
    var z = f * v + e * u;
    var y = [new ClipVertex(),new ClipVertex()];
    var x = [new ClipVertex(),new ClipVertex()];
    var Q = 0;
    b2Collision.b2CollidePolyTempVec.Set(-f, -e);
    Q = b2Collision.ClipSegmentToLine(y, c, b2Collision.b2CollidePolyTempVec, A);
    if (Q < 2) {
        return
    }
    b2Collision.b2CollidePolyTempVec.Set(f, e);
    Q = b2Collision.ClipSegmentToLine(x, y, b2Collision.b2CollidePolyTempVec, z);
    if (Q < 2) {
        return
    }
    if (R) {
        w.normal.Set(-n, -m)
    } else {
        w.normal.Set(n, m)
    }
    var r = 0;
    for (var P = b2Settings.b2_maxManifoldPoints; P--;) {
        var D = x[P].v;
        var l = (n * D.x + m * D.y) - C;
        if (l <= 0 || b == true) {
            var t = w.points[r];
            t.separation = l;
            t.position.SetV(x[P].v);
            t.id.Set(x[P].id);
            t.id.features.flip = R;
            ++r
        }
    }
    w.pointCount = r
};
b2Collision.b2CollideCircle = function(h, i, f, b) {
    h.pointCount = 0;
    var g = f.m_position.x - i.m_position.x;
    var e = f.m_position.y - i.m_position.y;
    var m = g * g + e * e;
    var l = i.m_radius + f.m_radius;
    if (m > l * l && b == false) {
        return
    }
    var d;
    if (m < Number.MIN_VALUE) {
        d = -l;
        h.normal.Set(0, 1)
    } else {
        var j = Math.sqrt(m);
        d = j - l;
        var k = 1 / j;
        h.normal.x = k * g;
        h.normal.y = k * e
    }
    h.pointCount = 1;
    var c = h.points[0];
    c.id.set_key(0);
    c.separation = d;
    c.position.x = f.m_position.x - (f.m_radius * h.normal.x);
    c.position.y = f.m_position.y - (f.m_radius * h.normal.y)
};
b2Collision.b2CollidePolyAndCircle = function(x, m, k, C) {
    x.pointCount = 0;
    var h;
    var e;
    var d;
    var z = k.m_position.x - m.m_position.x;
    var y = k.m_position.y - m.m_position.y;
    var n = m.m_R;
    var v = z * n.col1.x + y * n.col1.y;
    y = z * n.col2.x + y * n.col2.y;
    z = v;
    var w;
    var B = 0;
    var o = -Number.MAX_VALUE;
    var g = k.m_radius;
    for (var A = m.m_vertexCount; A--;) {
        var t = m.m_normals[A].x * (z - m.m_vertices[A].x) + m.m_normals[A].y * (y - m.m_vertices[A].y);
        if (t > g) {
            return
        }
        if (t > o) {
            o = t;
            B = A
        }
    }
    if (o < Number.MIN_VALUE) {
        x.pointCount = 1;
        var c = m.m_normals[B];
        x.normal.x = n.col1.x * c.x + n.col2.x * c.y;
        x.normal.y = n.col1.y * c.x + n.col2.y * c.y;
        h = x.points[0];
        h.id.features.incidentEdge = B;
        h.id.features.incidentVertex = b2Collision.b2_nullFeature;
        h.id.features.referenceFace = b2Collision.b2_nullFeature;
        h.id.features.flip = 0;
        h.position.x = k.m_position.x - g * x.normal.x;
        h.position.y = k.m_position.y - g * x.normal.y;
        h.separation = o - g;
        return
    }
    var b = B;
    var a = b + 1 < m.m_vertexCount ? b + 1 : 0;
    var r = m.m_vertices[a].x - m.m_vertices[b].x;
    var p = m.m_vertices[a].y - m.m_vertices[b].y;
    var f = Math.sqrt(r * r + p * p);
    r /= f;
    p /= f;
    if (f < Number.MIN_VALUE) {
        e = z - m.m_vertices[b].x;
        d = y - m.m_vertices[b].y;
        w = Math.sqrt(e * e + d * d);
        e /= w;
        d /= w;
        if (w > g) {
            return
        }
        x.pointCount = 1;
        x.normal.Set(n.col1.x * e + n.col2.x * d, n.col1.y * e + n.col2.y * d);
        h = x.points[0];
        h.id.features.incidentEdge = b2Collision.b2_nullFeature;
        h.id.features.incidentVertex = b;
        h.id.features.referenceFace = b2Collision.b2_nullFeature;
        h.id.features.flip = 0;
        h.position.x = k.m_position.x - g * x.normal.x;
        h.position.y = k.m_position.y - g * x.normal.y;
        h.separation = w - g;
        return
    }
    var q = (z - m.m_vertices[b].x) * r + (y - m.m_vertices[b].y) * p;
    h = x.points[0];
    h.id.features.incidentEdge = b2Collision.b2_nullFeature;
    h.id.features.incidentVertex = b2Collision.b2_nullFeature;
    h.id.features.referenceFace = b2Collision.b2_nullFeature;
    h.id.features.flip = 0;
    var l,j;
    if (q <= 0) {
        l = m.m_vertices[b].x;
        j = m.m_vertices[b].y;
        h.id.features.incidentVertex = b
    } else {
        if (q >= f) {
            l = m.m_vertices[a].x;
            j = m.m_vertices[a].y;
            h.id.features.incidentVertex = a
        } else {
            l = r * q + m.m_vertices[b].x;
            j = p * q + m.m_vertices[b].y;
            h.id.features.incidentEdge = b
        }
    }
    e = z - l;
    d = y - j;
    w = Math.sqrt(e * e + d * d);
    e /= w;
    d /= w;
    if (w > g) {
        return
    }
    x.pointCount = 1;
    x.normal.Set(n.col1.x * e + n.col2.x * d, n.col1.y * e + n.col2.y * d);
    h.position.x = k.m_position.x - g * x.normal.x;
    h.position.y = k.m_position.y - g * x.normal.y;
    h.separation = w - g
};
b2Collision.b2TestOverlap = function(d, c) {
    var i = c.minVertex;
    var g = d.maxVertex;
    var f = i.x - g.x;
    var e = i.y - g.y;
    i = d.minVertex;
    g = c.maxVertex;
    var j = i.x - g.x;
    var h = i.y - g.y;
    if (f > 0 || e > 0) {
        return false
    }
    if (j > 0 || h > 0) {
        return false
    }
    return true
};
var Features = function() {
};
Features.prototype = {set_referenceFace:function(a) {
    this._referenceFace = a;
    this._m_id._key = (this._m_id._key & 4294967040) | (this._referenceFace & 255)
},get_referenceFace:function() {
    return this._referenceFace
},_referenceFace:0,set_incidentEdge:function(a) {
    this._incidentEdge = a;
    this._m_id._key = (this._m_id._key & 4294902015) | ((this._incidentEdge << 8) & 65280)
},get_incidentEdge:function() {
    return this._incidentEdge
},_incidentEdge:0,set_incidentVertex:function(a) {
    this._incidentVertex = a;
    this._m_id._key = (this._m_id._key & 4278255615) | ((this._incidentVertex << 16) & 16711680)
},get_incidentVertex:function() {
    return this._incidentVertex
},_incidentVertex:0,set_flip:function(a) {
    this._flip = a;
    this._m_id._key = (this._m_id._key & 16777215) | ((this._flip << 24) & 4278190080)
},get_flip:function() {
    return this._flip
},_flip:0,_m_id:null,};
var b2ContactID = function() {
    this.features = new Features();
    this.features._m_id = this
};
b2ContactID.prototype = {Set:function(a) {
    this.set_key(a._key)
},Copy:function() {
    var a = new b2ContactID();
    a.set_key(this._key);
    return a
},get_key:function() {
    return this._key
},set_key:function(a) {
    this._key = a;
    this.features._referenceFace = this._key & 255;
    this.features._incidentEdge = ((this._key & 65280) >> 8) & 255;
    this.features._incidentVertex = ((this._key & 16711680) >> 16) & 255;
    this.features._flip = ((this._key & 4278190080) >> 24) & 255
},features:null,_key:0};
var b2ContactPoint = function() {
    this.position = new b2Vec2();
    this.id = new b2ContactID()
};
b2ContactPoint.prototype = {position:new b2Vec2(),separation:null,normalImpulse:null,tangentImpulse:null,id:new b2ContactID(),};
var b2Distance = function() {
};
b2Distance.prototype = {ProcessTwo:function(j, h, b, k, i) {
    var f = -i[1].x;
    var e = -i[1].y;
    var d = i[0].x - i[1].x;
    var c = i[0].y - i[1].y;
    var a = Math.sqrt(d * d + c * c);
    d /= a;
    c /= a;
    var g = f * d + e * c;
    if (g <= 0 || a < Number.MIN_VALUE) {
        j.SetV(b[1]);
        h.SetV(k[1]);
        b[0].SetV(b[1]);
        k[0].SetV(k[1]);
        i[0].SetV(i[1]);
        return 1
    }
    g /= a;
    j.x = b[1].x + g * (b[0].x - b[1].x);
    j.y = b[1].y + g * (b[0].y - b[1].y);
    h.x = k[1].x + g * (k[0].x - k[1].x);
    h.y = k[1].y + g * (k[0].y - k[1].y);
    return 2
},ProcessThree:function(q, D, m, C, G) {
    var k = G[0].x;
    var h = G[0].y;
    var z = G[1].x;
    var s = G[1].y;
    var J = G[2].x;
    var I = G[2].y;
    var l = z - k;
    var i = s - h;
    var y = J - k;
    var r = I - h;
    var c = J - z;
    var b = I - s;
    var H = -(k * l + h * i);
    var a = (z * l + s * i);
    var j = -(k * y + h * r);
    var o = (J * y + I * r);
    var x = -(z * c + s * b);
    var F = (J * c + I * b);
    if (o <= 0 && F <= 0) {
        q.SetV(m[2]);
        D.SetV(C[2]);
        m[0].SetV(m[2]);
        C[0].SetV(C[2]);
        G[0].SetV(G[2]);
        return 1
    }
    var E = l * r - i * y;
    var e = E * (k * s - h * z);
    var g = E * (z * I - s * J);
    if (g <= 0 && x >= 0 && F >= 0) {
        var B = x / (x + F);
        q.x = m[1].x + B * (m[2].x - m[1].x);
        q.y = m[1].y + B * (m[2].y - m[1].y);
        D.x = C[1].x + B * (C[2].x - C[1].x);
        D.y = C[1].y + B * (C[2].y - C[1].y);
        m[0].SetV(m[2]);
        C[0].SetV(C[2]);
        G[0].SetV(G[2]);
        return 2
    }
    var f = E * (J * h - I * k);
    if (f <= 0 && j >= 0 && o >= 0) {
        var B = j / (j + o);
        q.x = m[0].x + B * (m[2].x - m[0].x);
        q.y = m[0].y + B * (m[2].y - m[0].y);
        D.x = C[0].x + B * (C[2].x - C[0].x);
        D.y = C[0].y + B * (C[2].y - C[0].y);
        m[1].SetV(m[2]);
        C[1].SetV(C[2]);
        G[1].SetV(G[2]);
        return 2
    }
    var d = g + f + e;
    d = 1 / d;
    var A = g * d;
    var t = f * d;
    var p = 1 - A - t;
    q.x = A * m[0].x + t * m[1].x + p * m[2].x;
    q.y = A * m[0].y + t * m[1].y + p * m[2].y;
    D.x = A * C[0].x + t * C[1].x + p * C[2].x;
    D.y = A * C[0].y + t * C[1].y + p * C[2].y;
    return 3
},InPoinsts:function(a, c, d) {
    for (var b = d; b--;) {
        if (a.x == c[b].x && a.y == c[b].y) {
            return true
        }
    }
    return false
},Distance:function(h, n, c, a) {
    var d = new Array(3);
    var l = new Array(3);
    var s = new Array(3);
    var u = 0;
    h.SetV(c.m_position);
    n.SetV(a.m_position);
    var k = 0;
    var q = 20;
    for (var t = 0; t < q; ++t) {
        var f = n.x - h.x;
        var e = n.y - h.y;
        var j = c.Support(f, e);
        var g = a.Support(-f, -e);
        k = (f * f + e * e);
        var p = g.x - j.x;
        var m = g.y - j.y;
        var o = (f * p + e * m);
        if (k - b2Dot(f * p + e * m) <= 0.01 * k) {
            if (u == 0) {
                h.SetV(j);
                n.SetV(g)
            }
            b2Distance.g_GJK_Iterations = t;
            return Math.sqrt(k)
        }
        switch (u) {
            case 0:
                d[0].SetV(j);
                l[0].SetV(g);
                s[0] = w;
                h.SetV(d[0]);
                n.SetV(l[0]);
                ++u;
                break;
            case 1:
                d[1].SetV(j);
                l[1].SetV(g);
                s[1].x = p;
                s[1].y = m;
                u = b2Distance.ProcessTwo(h, n, d, l, s);
                break;
            case 2:
                d[2].SetV(j);
                l[2].SetV(g);
                s[2].x = p;
                s[2].y = m;
                u = b2Distance.ProcessThree(h, n, d, l, s);
                break
        }
        if (u == 3) {
            b2Distance.g_GJK_Iterations = t;
            return 0
        }
        var b = -Number.MAX_VALUE;
        for (var r = u; r--;) {
            b = b2Math.b2Max(b, (s[r].x * s[r].x + s[r].y * s[r].y))
        }
        if (u == 3 || k <= 100 * Number.MIN_VALUE * b) {
            b2Distance.g_GJK_Iterations = t;
            return Math.sqrt(k)
        }
    }
    b2Distance.g_GJK_Iterations = q;
    return Math.sqrt(k)
}};
b2Distance.g_GJK_Iterations = 0;
var b2Manifold = function() {
    this.points = new Array(b2Settings.b2_maxManifoldPoints);
    for (var a = b2Settings.b2_maxManifoldPoints; a--;) {
        this.points[a] = new b2ContactPoint()
    }
    this.normal = new b2Vec2()
};
b2Manifold.prototype = {points:null,normal:null,pointCount:0};
var b2OBB = function() {
    this.R = new b2Mat22();
    this.center = new b2Vec2();
    this.extents = new b2Vec2()
};
b2OBB.prototype = {R:new b2Mat22(),center:new b2Vec2(),extents:new b2Vec2(),};
var b2Proxy = function() {
    this.lowerBounds = [(0),(0)];
    this.upperBounds = [(0),(0)]
};
b2Proxy.prototype = {GetNext:function() {
    return this.lowerBounds[0]
},SetNext:function(a) {
    this.lowerBounds[0] = a
},IsValid:function() {
    return this.overlapCount != b2BroadPhase.b2_invalid
},lowerBounds:[(0),(0)],upperBounds:[(0),(0)],overlapCount:0,timeStamp:0,userData:null,};
var ClipVertex = function() {
    this.v = new b2Vec2();
    this.id = new b2ContactID()
};
ClipVertex.prototype = {v:new b2Vec2(),id:new b2ContactID(),};
var b2Shape = function(b, a) {
    this.m_R = new b2Mat22();
    this.m_position = new b2Vec2();
    this.m_userData = b.userData;
    this.m_friction = b.friction;
    this.m_restitution = b.restitution;
    this.m_body = a;
    this.m_proxyId = b2Pair.b2_nullProxy;
    this.m_maxRadius = 0;
    this.m_categoryBits = b.categoryBits;
    this.m_maskBits = b.maskBits;
    this.m_groupIndex = b.groupIndex
};
b2Shape.prototype = {TestPoint:function(a) {
    return false
},GetUserData:function() {
    return this.m_userData
},GetType:function() {
    return this.m_type
},GetBody:function() {
    return this.m_body
},GetPosition:function() {
    return this.m_position
},GetRotationMatrix:function() {
    return this.m_R
},ResetProxy:function(a) {
},GetNext:function() {
    return this.m_next
},DestroyProxy:function() {
    if (this.m_proxyId != b2Pair.b2_nullProxy) {
        this.m_body.m_world.m_broadPhase.DestroyProxy(this.m_proxyId);
        this.m_proxyId = b2Pair.b2_nullProxy
    }
},Synchronize:function(b, d, a, c) {
},QuickSync:function(a, b) {
},Support:function(b, a, c) {
},GetMaxRadius:function() {
    return this.m_maxRadius
},m_next:null,m_R:new b2Mat22(),m_position:new b2Vec2(),m_type:0,m_userData:null,m_body:null,m_friction:null,m_restitution:null,m_maxRadius:null,m_proxyId:0,m_categoryBits:0,m_maskBits:0,m_groupIndex:0};
b2Shape.Create = function(c, b, a) {
    switch (c.type) {
        case b2Shape.e_circleShape:
            return new b2CircleShape(c, b, a);
        case b2Shape.e_boxShape:
        case b2Shape.e_polyShape:
            return new b2PolyShape(c, b, a)
    }
    return null
};
b2Shape.Destroy = function(a) {
    if (a.m_proxyId != b2Pair.b2_nullProxy) {
        a.m_body.m_world.m_broadPhase.DestroyProxy(a.m_proxyId)
    }
};
b2Shape.e_unknownShape = -1;
b2Shape.e_circleShape = 0;
b2Shape.e_boxShape = 1;
b2Shape.e_polyShape = 2;
b2Shape.e_meshShape = 3;
b2Shape.e_shapeTypeCount = 4;
b2Shape.PolyMass = function(o, w, l, e) {
    var z = new b2Vec2();
    z.SetZero();
    var y = 0;
    var n = 0;
    var j = new b2Vec2(0, 0);
    var t = 1 / 3;
    for (var x = l; x--;) {
        var d = j;
        var c = w[x];
        var b = x + 1 < l ? w[x + 1] : w[0];
        var m = b2Math.SubtractVV(c, d);
        var k = b2Math.SubtractVV(b, d);
        var r = b2Math.b2CrossVV(m, k);
        var h = 0.5 * r;
        y += h;
        var g = new b2Vec2();
        g.SetV(d);
        g.Add(c);
        g.Add(b);
        g.Multiply(t * h);
        z.Add(g);
        var s = d.x;
        var q = d.y;
        var v = m.x;
        var a = m.y;
        var u = k.x;
        var A = k.y;
        var f = t * (0.25 * (v * v + u * v + u * u) + (s * v + s * u)) + 0.5 * s * s;
        var p = t * (0.25 * (a * a + A * a + A * A) + (q * a + q * A)) + 0.5 * q * q;
        n += r * (f + p)
    }
    o.mass = e * y;
    z.Multiply(1 / y);
    o.center = z;
    n = e * (n - y * b2Math.b2Dot(z, z));
    o.I = n
};
b2Shape.PolyCentroid = function(o, g, s) {
    var u = 0;
    var t = 0;
    var v = 0;
    var c = 0;
    var b = 0;
    var l = 1 / 3;
    for (var r = g; r--;) {
        var q = c;
        var p = b;
        var e = o[r].x;
        var d = o[r].y;
        var j = r + 1 < g ? o[r + 1].x : o[0].x;
        var h = r + 1 < g ? o[r + 1].y : o[0].y;
        var n = e - q;
        var m = d - p;
        var a = j - q;
        var w = h - p;
        var k = (n * w - m * a);
        var f = 0.5 * k;
        v += f;
        u += f * l * (q + e + j);
        t += f * l * (p + d + h)
    }
    u *= 1 / v;
    t *= 1 / v;
    s.Set(u, t)
};
var b2ShapeDef = function() {
    this.type = b2Shape.e_unknownShape;
    this.userData = null;
    this.localPosition = new b2Vec2(0, 0);
    this.localRotation = 0;
    this.friction = 0.2;
    this.restitution = 0;
    this.density = 0;
    this.categoryBits = 1;
    this.maskBits = 65535;
    this.groupIndex = 0
};
b2ShapeDef.prototype = {ComputeMass:function(a) {
    a.center = new b2Vec2(0, 0);
    if (this.density == 0) {
        a.mass = 0;
        a.center.Set(0, 0);
        a.I = 0
    }
    switch (this.type) {
        case b2Shape.e_circleShape:
            var d = this;
            a.mass = this.density * b2Settings.b2_pi * d.radius * d.radius;
            a.center.Set(0, 0);
            a.I = 0.5 * (a.mass) * d.radius * d.radius;
            break;
        case b2Shape.e_boxShape:
            var b = this;
            a.mass = 4 * this.density * b.extents.x * b.extents.y;
            a.center.Set(0, 0);
            a.I = a.mass / 3 * b2Math.b2Dot(b.extents, b.extents);
            break;
        case b2Shape.e_polyShape:
            var c = this;
            b2Shape.PolyMass(a, c.vertices, c.vertexCount, this.density);
            break;
        default:
            a.mass = 0;
            a.center.Set(0, 0);
            a.I = 0;
            break
    }
},type:0,userData:null,localPosition:null,localRotation:null,friction:null,restitution:null,density:null,categoryBits:0,maskBits:0,groupIndex:0};
var b2BoxDef = function() {
    this.type = b2Shape.e_unknownShape;
    this.userData = null;
    this.localPosition = new b2Vec2(0, 0);
    this.localRotation = 0;
    this.friction = 0.2;
    this.restitution = 0;
    this.density = 0;
    this.categoryBits = 1;
    this.maskBits = 65535;
    this.groupIndex = 0;
    this.type = b2Shape.e_boxShape;
    this.extents = new b2Vec2(1, 1)
};
Object.extend(b2BoxDef.prototype, b2ShapeDef.prototype);
Object.extend(b2BoxDef.prototype, {extents:null});
var b2CircleDef = function() {
    this.type = b2Shape.e_unknownShape;
    this.userData = null;
    this.localPosition = new b2Vec2(0, 0);
    this.localRotation = 0;
    this.friction = 0.2;
    this.restitution = 0;
    this.density = 0;
    this.categoryBits = 1;
    this.maskBits = 65535;
    this.groupIndex = 0;
    this.type = b2Shape.e_circleShape;
    this.radius = 1
};
Object.extend(b2CircleDef.prototype, b2ShapeDef.prototype);
Object.extend(b2CircleDef.prototype, {radius:null});
var b2CircleShape = function(g, c, b) {
    this.m_R = new b2Mat22();
    this.m_position = new b2Vec2();
    this.m_userData = g.userData;
    this.m_friction = g.friction;
    this.m_restitution = g.restitution;
    this.m_body = c;
    this.m_proxyId = b2Pair.b2_nullProxy;
    this.m_maxRadius = 0;
    this.m_categoryBits = g.categoryBits;
    this.m_maskBits = g.maskBits;
    this.m_groupIndex = g.groupIndex;
    this.m_localPosition = new b2Vec2();
    var h = g;
    this.m_localPosition.Set(g.localPosition.x - b.x, g.localPosition.y - b.y);
    this.m_type = b2Shape.e_circleShape;
    this.m_radius = h.radius;
    this.m_R.SetM(this.m_body.m_R);
    var f = this.m_R.col1.x * this.m_localPosition.x + this.m_R.col2.x * this.m_localPosition.y;
    var e = this.m_R.col1.y * this.m_localPosition.x + this.m_R.col2.y * this.m_localPosition.y;
    this.m_position.x = this.m_body.m_position.x + f;
    this.m_position.y = this.m_body.m_position.y + e;
    this.m_maxRadius = Math.sqrt(f * f + e * e) + this.m_radius;
    var d = new b2AABB();
    d.minVertex.Set(this.m_position.x - this.m_radius, this.m_position.y - this.m_radius);
    d.maxVertex.Set(this.m_position.x + this.m_radius, this.m_position.y + this.m_radius);
    var a = this.m_body.m_world.m_broadPhase;
    if (a.InRange(d)) {
        this.m_proxyId = a.CreateProxy(d, this)
    } else {
        this.m_proxyId = b2Pair.b2_nullProxy
    }
    if (this.m_proxyId == b2Pair.b2_nullProxy) {
        this.m_body.Freeze()
    }
};
Object.extend(b2CircleShape.prototype, b2Shape.prototype);
Object.extend(b2CircleShape.prototype, {TestPoint:function(a) {
    var b = new b2Vec2();
    b.SetV(a);
    b.Subtract(this.m_position);
    return b2Math.b2Dot(b, b) <= this.m_radius * this.m_radius
},Synchronize:function(c, e, a, b) {
    this.m_R.SetM(b);
    this.m_position.x = (b.col1.x * this.m_localPosition.x + b.col2.x * this.m_localPosition.y) + a.x;
    this.m_position.y = (b.col1.y * this.m_localPosition.x + b.col2.y * this.m_localPosition.y) + a.y;
    if (this.m_proxyId == b2Pair.b2_nullProxy) {
        return
    }
    var i = c.x + (e.col1.x * this.m_localPosition.x + e.col2.x * this.m_localPosition.y);
    var h = c.y + (e.col1.y * this.m_localPosition.x + e.col2.y * this.m_localPosition.y);
    var l = Math.min(i, this.m_position.x);
    var k = Math.min(h, this.m_position.y);
    var f = Math.max(i, this.m_position.x);
    var d = Math.max(h, this.m_position.y);
    var g = new b2AABB();
    g.minVertex.Set(l - this.m_radius, k - this.m_radius);
    g.maxVertex.Set(f + this.m_radius, d + this.m_radius);
    var j = this.m_body.m_world.m_broadPhase;
    if (j.InRange(g)) {
        j.MoveProxy(this.m_proxyId, g)
    } else {
        this.m_body.Freeze()
    }
},QuickSync:function(a, b) {
    this.m_R.SetM(b);
    this.m_position.x = (b.col1.x * this.m_localPosition.x + b.col2.x * this.m_localPosition.y) + a.x;
    this.m_position.y = (b.col1.y * this.m_localPosition.x + b.col2.y * this.m_localPosition.y) + a.y
},ResetProxy:function(a) {
    if (this.m_proxyId == b2Pair.b2_nullProxy) {
        return
    }
    var c = a.GetProxy(this.m_proxyId);
    a.DestroyProxy(this.m_proxyId);
    c = null;
    var b = new b2AABB();
    b.minVertex.Set(this.m_position.x - this.m_radius, this.m_position.y - this.m_radius);
    b.maxVertex.Set(this.m_position.x + this.m_radius, this.m_position.y + this.m_radius);
    if (a.InRange(b)) {
        this.m_proxyId = a.CreateProxy(b, this)
    } else {
        this.m_proxyId = b2Pair.b2_nullProxy
    }
    if (this.m_proxyId == b2Pair.b2_nullProxy) {
        this.m_body.Freeze()
    }
},Support:function(c, b, d) {
    var a = Math.sqrt(c * c + b * b);
    c /= a;
    b /= a;
    d.Set(this.m_position.x + this.m_radius * c, this.m_position.y + this.m_radius * b)
},m_localPosition:new b2Vec2(),m_radius:null});
var b2MassData = function() {
    this.center = new b2Vec2(0, 0)
};
b2MassData.prototype = {mass:0,center:new b2Vec2(0, 0),I:0,};
var b2PolyDef = function() {
    this.type = b2Shape.e_unknownShape;
    this.userData = null;
    this.localPosition = new b2Vec2(0, 0);
    this.localRotation = 0;
    this.friction = 0.2;
    this.restitution = 0;
    this.density = 0;
    this.categoryBits = 1;
    this.maskBits = 65535;
    this.groupIndex = 0;
    this.vertices = new Array(b2Settings.b2_maxPolyVertices);
    this.type = b2Shape.e_polyShape;
    this.vertexCount = 0;
    for (var a = b2Settings.b2_maxPolyVertices; a--;) {
        this.vertices[a] = new b2Vec2()
    }
};
Object.extend(b2PolyDef.prototype, b2ShapeDef.prototype);
Object.extend(b2PolyDef.prototype, {vertices:new Array(b2Settings.b2_maxPolyVertices),vertexCount:0});
var b2PolyShape = function(s, o, a) {
    this.m_R = new b2Mat22();
    this.m_position = new b2Vec2();
    this.m_userData = s.userData;
    this.m_friction = s.friction;
    this.m_restitution = s.restitution;
    this.m_body = o;
    this.m_proxyId = b2Pair.b2_nullProxy;
    this.m_maxRadius = 0;
    this.m_categoryBits = s.categoryBits;
    this.m_maskBits = s.maskBits;
    this.m_groupIndex = s.groupIndex;
    this.syncAABB = new b2AABB();
    this.syncMat = new b2Mat22();
    this.m_localCentroid = new b2Vec2();
    this.m_localOBB = new b2OBB();
    var w = 0;
    var r;
    var q;
    var b;
    var k = new b2AABB();
    this.m_vertices = new Array(b2Settings.b2_maxPolyVertices);
    this.m_coreVertices = new Array(b2Settings.b2_maxPolyVertices);
    this.m_normals = new Array(b2Settings.b2_maxPolyVertices);
    this.m_type = b2Shape.e_polyShape;
    var c = new b2Mat22(s.localRotation);
    if (s.type == b2Shape.e_boxShape) {
        this.m_localCentroid.x = s.localPosition.x - a.x;
        this.m_localCentroid.y = s.localPosition.y - a.y;
        var n = s;
        this.m_vertexCount = 4;
        r = n.extents.x;
        q = n.extents.y;
        var j = Math.max(0, r - 2 * b2Settings.b2_linearSlop);
        var g = Math.max(0, q - 2 * b2Settings.b2_linearSlop);
        b = this.m_vertices[0] = new b2Vec2();
        b.x = c.col1.x * r + c.col2.x * q;
        b.y = c.col1.y * r + c.col2.y * q;
        b = this.m_vertices[1] = new b2Vec2();
        b.x = c.col1.x * -r + c.col2.x * q;
        b.y = c.col1.y * -r + c.col2.y * q;
        b = this.m_vertices[2] = new b2Vec2();
        b.x = c.col1.x * -r + c.col2.x * -q;
        b.y = c.col1.y * -r + c.col2.y * -q;
        b = this.m_vertices[3] = new b2Vec2();
        b.x = c.col1.x * r + c.col2.x * -q;
        b.y = c.col1.y * r + c.col2.y * -q;
        b = this.m_coreVertices[0] = new b2Vec2();
        b.x = c.col1.x * j + c.col2.x * g;
        b.y = c.col1.y * j + c.col2.y * g;
        b = this.m_coreVertices[1] = new b2Vec2();
        b.x = c.col1.x * -j + c.col2.x * g;
        b.y = c.col1.y * -j + c.col2.y * g;
        b = this.m_coreVertices[2] = new b2Vec2();
        b.x = c.col1.x * -j + c.col2.x * -g;
        b.y = c.col1.y * -j + c.col2.y * -g;
        b = this.m_coreVertices[3] = new b2Vec2();
        b.x = c.col1.x * j + c.col2.x * -g;
        b.y = c.col1.y * j + c.col2.y * -g
    } else {
        var e = s;
        this.m_vertexCount = e.vertexCount;
        b2Shape.PolyCentroid(e.vertices, e.vertexCount, b2PolyShape.tempVec);
        var h = b2PolyShape.tempVec.x;
        var f = b2PolyShape.tempVec.y;
        this.m_localCentroid.x = s.localPosition.x + (c.col1.x * h + c.col2.x * f) - a.x;
        this.m_localCentroid.y = s.localPosition.y + (c.col1.y * h + c.col2.y * f) - a.y;
        for (w = this.m_vertexCount; w--;) {
            this.m_vertices[w] = new b2Vec2();
            this.m_coreVertices[w] = new b2Vec2();
            r = e.vertices[w].x - h;
            q = e.vertices[w].y - f;
            this.m_vertices[w].x = c.col1.x * r + c.col2.x * q;
            this.m_vertices[w].y = c.col1.y * r + c.col2.y * q;
            var D = this.m_vertices[w].x;
            var C = this.m_vertices[w].y;
            var d = Math.sqrt(D * D + C * C);
            if (d > Number.MIN_VALUE) {
                D *= 1 / d;
                C *= 1 / d
            }
            this.m_coreVertices[w].x = this.m_vertices[w].x - 2 * b2Settings.b2_linearSlop * D;
            this.m_coreVertices[w].y = this.m_vertices[w].y - 2 * b2Settings.b2_linearSlop * C
        }
    }
    var y = Number.MAX_VALUE;
    var x = Number.MAX_VALUE;
    var m = -Number.MAX_VALUE;
    var l = -Number.MAX_VALUE;
    this.m_maxRadius = 0;
    for (w = this.m_vertexCount; w--;) {
        var p = this.m_vertices[w];
        y = Math.min(y, p.x);
        x = Math.min(x, p.y);
        m = Math.max(m, p.x);
        l = Math.max(l, p.y);
        this.m_maxRadius = Math.max(this.m_maxRadius, p.Length())
    }
    this.m_localOBB.R.SetIdentity();
    this.m_localOBB.center.Set((y + m) * 0.5, (x + l) * 0.5);
    this.m_localOBB.extents.Set((m - y) * 0.5, (l - x) * 0.5);
    var u = 0;
    var t = 0;
    for (w = this.m_vertexCount; w--;) {
        this.m_normals[w] = new b2Vec2();
        u = w;
        t = w + 1 < this.m_vertexCount ? w + 1 : 0;
        this.m_normals[w].x = this.m_vertices[t].y - this.m_vertices[u].y;
        this.m_normals[w].y = -(this.m_vertices[t].x - this.m_vertices[u].x);
        this.m_normals[w].Normalize()
    }
    this.m_R.SetM(this.m_body.m_R);
    this.m_position.x = this.m_body.m_position.x + (this.m_R.col1.x * this.m_localCentroid.x + this.m_R.col2.x * this.m_localCentroid.y);
    this.m_position.y = this.m_body.m_position.y + (this.m_R.col1.y * this.m_localCentroid.x + this.m_R.col2.y * this.m_localCentroid.y);
    b2PolyShape.tAbsR.col1.x = this.m_R.col1.x * this.m_localOBB.R.col1.x + this.m_R.col2.x * this.m_localOBB.R.col1.y;
    b2PolyShape.tAbsR.col1.y = this.m_R.col1.y * this.m_localOBB.R.col1.x + this.m_R.col2.y * this.m_localOBB.R.col1.y;
    b2PolyShape.tAbsR.col2.x = this.m_R.col1.x * this.m_localOBB.R.col2.x + this.m_R.col2.x * this.m_localOBB.R.col2.y;
    b2PolyShape.tAbsR.col2.y = this.m_R.col1.y * this.m_localOBB.R.col2.x + this.m_R.col2.y * this.m_localOBB.R.col2.y;
    b2PolyShape.tAbsR.Abs();
    r = b2PolyShape.tAbsR.col1.x * this.m_localOBB.extents.x + b2PolyShape.tAbsR.col2.x * this.m_localOBB.extents.y;
    q = b2PolyShape.tAbsR.col1.y * this.m_localOBB.extents.x + b2PolyShape.tAbsR.col2.y * this.m_localOBB.extents.y;
    var B = this.m_position.x + (this.m_R.col1.x * this.m_localOBB.center.x + this.m_R.col2.x * this.m_localOBB.center.y);
    var A = this.m_position.y + (this.m_R.col1.y * this.m_localOBB.center.x + this.m_R.col2.y * this.m_localOBB.center.y);
    k.minVertex.x = B - r;
    k.minVertex.y = A - q;
    k.maxVertex.x = B + r;
    k.maxVertex.y = A + q;
    var z = this.m_body.m_world.m_broadPhase;
    if (z.InRange(k)) {
        this.m_proxyId = z.CreateProxy(k, this)
    } else {
        this.m_proxyId = b2Pair.b2_nullProxy
    }
    if (this.m_proxyId == b2Pair.b2_nullProxy) {
        this.m_body.Freeze()
    }
};
Object.extend(b2PolyShape.prototype, b2Shape.prototype);
Object.extend(b2PolyShape.prototype, {TestPoint:function(d) {
    var e = new b2Vec2();
    e.SetV(d);
    e.Subtract(this.m_position);
    e.MulTM(this.m_R);
    for (var c = this.m_vertexCount; c--;) {
        var b = new b2Vec2();
        b.SetV(e);
        b.Subtract(this.m_vertices[c]);
        var a = b2Math.b2Dot(this.m_normals[c], b);
        if (a > 0) {
            return false
        }
    }
    return true
},syncAABB:new b2AABB(),syncMat:new b2Mat22(),Synchronize:function(c, e, a, b) {
    this.m_R.SetM(b);
    this.m_position.x = this.m_body.m_position.x + (b.col1.x * this.m_localCentroid.x + b.col2.x * this.m_localCentroid.y);
    this.m_position.y = this.m_body.m_position.y + (b.col1.y * this.m_localCentroid.x + b.col2.y * this.m_localCentroid.y);
    if (this.m_proxyId == b2Pair.b2_nullProxy) {
        return
    }
    var m;
    var l;
    var k = e.col1;
    var j = e.col2;
    var i = this.m_localOBB.R.col1;
    var h = this.m_localOBB.R.col2;
    this.syncMat.col1.x = k.x * i.x + j.x * i.y;
    this.syncMat.col1.y = k.y * i.x + j.y * i.y;
    this.syncMat.col2.x = k.x * h.x + j.x * h.y;
    this.syncMat.col2.y = k.y * h.x + j.y * h.y;
    this.syncMat.Abs();
    m = this.m_localCentroid.x + this.m_localOBB.center.x;
    l = this.m_localCentroid.y + this.m_localOBB.center.y;
    var f = c.x + (e.col1.x * m + e.col2.x * l);
    var d = c.y + (e.col1.y * m + e.col2.y * l);
    m = this.syncMat.col1.x * this.m_localOBB.extents.x + this.syncMat.col2.x * this.m_localOBB.extents.y;
    l = this.syncMat.col1.y * this.m_localOBB.extents.x + this.syncMat.col2.y * this.m_localOBB.extents.y;
    this.syncAABB.minVertex.x = f - m;
    this.syncAABB.minVertex.y = d - l;
    this.syncAABB.maxVertex.x = f + m;
    this.syncAABB.maxVertex.y = d + l;
    k = b.col1;
    j = b.col2;
    i = this.m_localOBB.R.col1;
    h = this.m_localOBB.R.col2;
    this.syncMat.col1.x = k.x * i.x + j.x * i.y;
    this.syncMat.col1.y = k.y * i.x + j.y * i.y;
    this.syncMat.col2.x = k.x * h.x + j.x * h.y;
    this.syncMat.col2.y = k.y * h.x + j.y * h.y;
    this.syncMat.Abs();
    m = this.m_localCentroid.x + this.m_localOBB.center.x;
    l = this.m_localCentroid.y + this.m_localOBB.center.y;
    f = a.x + (b.col1.x * m + b.col2.x * l);
    d = a.y + (b.col1.y * m + b.col2.y * l);
    m = this.syncMat.col1.x * this.m_localOBB.extents.x + this.syncMat.col2.x * this.m_localOBB.extents.y;
    l = this.syncMat.col1.y * this.m_localOBB.extents.x + this.syncMat.col2.y * this.m_localOBB.extents.y;
    this.syncAABB.minVertex.x = Math.min(this.syncAABB.minVertex.x, f - m);
    this.syncAABB.minVertex.y = Math.min(this.syncAABB.minVertex.y, d - l);
    this.syncAABB.maxVertex.x = Math.max(this.syncAABB.maxVertex.x, f + m);
    this.syncAABB.maxVertex.y = Math.max(this.syncAABB.maxVertex.y, d + l);
    var g = this.m_body.m_world.m_broadPhase;
    if (g.InRange(this.syncAABB)) {
        g.MoveProxy(this.m_proxyId, this.syncAABB)
    } else {
        this.m_body.Freeze()
    }
},QuickSync:function(a, b) {
    this.m_R.SetM(b);
    this.m_position.x = a.x + (b.col1.x * this.m_localCentroid.x + b.col2.x * this.m_localCentroid.y);
    this.m_position.y = a.y + (b.col1.y * this.m_localCentroid.x + b.col2.y * this.m_localCentroid.y)
},ResetProxy:function(b) {
    if (this.m_proxyId == b2Pair.b2_nullProxy) {
        return
    }
    var e = b.GetProxy(this.m_proxyId);
    b.DestroyProxy(this.m_proxyId);
    e = null;
    var g = b2Math.b2MulMM(this.m_R, this.m_localOBB.R);
    var d = b2Math.b2AbsM(g);
    var f = b2Math.b2MulMV(d, this.m_localOBB.extents);
    var a = b2Math.b2MulMV(this.m_R, this.m_localOBB.center);
    a.Add(this.m_position);
    var c = new b2AABB();
    c.minVertex.SetV(a);
    c.minVertex.Subtract(f);
    c.maxVertex.SetV(a);
    c.maxVertex.Add(f);
    if (b.InRange(c)) {
        this.m_proxyId = b.CreateProxy(c, this)
    } else {
        this.m_proxyId = b2Pair.b2_nullProxy
    }
    if (this.m_proxyId == b2Pair.b2_nullProxy) {
        this.m_body.Freeze()
    }
},Support:function(c, a, b) {
    var g = (c * this.m_R.col1.x + a * this.m_R.col1.y);
    var f = (c * this.m_R.col2.x + a * this.m_R.col2.y);
    var e = 0;
    var j = (this.m_coreVertices[0].x * g + this.m_coreVertices[0].y * f);
    for (var d = 1; d < this.m_vertexCount; ++d) {
        var h = (this.m_coreVertices[d].x * g + this.m_coreVertices[d].y * f);
        if (h > j) {
            e = d;
            j = h
        }
    }
    b.Set(this.m_position.x + (this.m_R.col1.x * this.m_coreVertices[e].x + this.m_R.col2.x * this.m_coreVertices[e].y), this.m_position.y + (this.m_R.col1.y * this.m_coreVertices[e].x + this.m_R.col2.y * this.m_coreVertices[e].y))
},m_localCentroid:new b2Vec2(),m_localOBB:new b2OBB(),m_vertices:null,m_coreVertices:null,m_vertexCount:0,m_normals:null});
b2PolyShape.tempVec = new b2Vec2();
b2PolyShape.tAbsR = new b2Mat22();
var b2Body = function(f, e) {
    this.sMat0 = new b2Mat22();
    this.m_position = new b2Vec2();
    this.m_R = new b2Mat22(0);
    this.m_position0 = new b2Vec2();
    var c = 0;
    var g;
    var a;
    this.m_flags = 0;
    this.m_position.SetV(f.position);
    this.m_rotation = f.rotation;
    this.m_R.Set(this.m_rotation);
    this.m_position0.SetV(this.m_position);
    this.m_rotation0 = this.m_rotation;
    this.m_world = e;
    this.m_linearDamping = b2Math.b2Clamp(1 - f.linearDamping, 0, 1);
    this.m_angularDamping = b2Math.b2Clamp(1 - f.angularDamping, 0, 1);
    this.m_force = new b2Vec2(0, 0);
    this.m_torque = 0;
    this.m_mass = 0;
    var h = new Array(b2Settings.b2_maxShapesPerBody);
    for (c = b2Settings.b2_maxShapesPerBody; c--;) {
        h[c] = new b2MassData()
    }
    this.m_shapeCount = 0;
    this.m_center = new b2Vec2(0, 0);
    for (c = 0; c < b2Settings.b2_maxShapesPerBody; ++c) {
        g = f.shapes[c];
        if (g == null) {
            break
        }
        a = h[c];
        g.ComputeMass(a);
        this.m_mass += a.mass;
        this.m_center.x += a.mass * (g.localPosition.x + a.center.x);
        this.m_center.y += a.mass * (g.localPosition.y + a.center.y);
        ++this.m_shapeCount
    }
    if (this.m_mass > 0) {
        this.m_center.Multiply(1 / this.m_mass);
        this.m_position.Add(b2Math.b2MulMV(this.m_R, this.m_center))
    } else {
        this.m_flags |= b2Body.e_staticFlag
    }
    this.m_I = 0;
    for (c = this.m_shapeCount; c--;) {
        g = f.shapes[c];
        a = h[c];
        this.m_I += a.I;
        var d = b2Math.SubtractVV(b2Math.AddVV(g.localPosition, a.center), this.m_center);
        this.m_I += a.mass * b2Math.b2Dot(d, d)
    }
    if (this.m_mass > 0) {
        this.m_invMass = 1 / this.m_mass
    } else {
        this.m_invMass = 0
    }
    if (this.m_I > 0 && f.preventRotation == false) {
        this.m_invI = 1 / this.m_I
    } else {
        this.m_I = 0;
        this.m_invI = 0
    }
    this.m_linearVelocity = b2Math.AddVV(f.linearVelocity, b2Math.b2CrossFV(f.angularVelocity, this.m_center));
    this.m_angularVelocity = f.angularVelocity;
    this.m_jointList = null;
    this.m_contactList = null;
    this.m_prev = null;
    this.m_next = null;
    this.m_shapeList = null;
    for (c = 0; c < this.m_shapeCount; ++c) {
        g = f.shapes[c];
        var b = b2Shape.Create(g, this, this.m_center);
        b.m_next = this.m_shapeList;
        this.m_shapeList = b
    }
    this.m_sleepTime = 0;
    if (f.allowSleep) {
        this.m_flags |= b2Body.e_allowSleepFlag
    }
    if (f.isSleeping) {
        this.m_flags |= b2Body.e_sleepFlag
    }
    if ((this.m_flags & b2Body.e_sleepFlag) || this.m_invMass == 0) {
        this.m_linearVelocity.Set(0, 0);
        this.m_angularVelocity = 0
    }
    this.m_userData = f.userData
};
b2Body.prototype = {SetOriginPosition:function(a, b) {
    if (this.IsFrozen()) {
        return
    }
    this.m_rotation = b;
    this.m_R.Set(this.m_rotation);
    this.m_position = b2Math.AddVV(a, b2Math.b2MulMV(this.m_R, this.m_center));
    this.m_position0.SetV(this.m_position);
    this.m_rotation0 = this.m_rotation;
    for (var c = this.m_shapeList; c != null; c = c.m_next) {
        c.Synchronize(this.m_position, this.m_R, this.m_position, this.m_R)
    }
    this.m_world.m_broadPhase.Commit()
},GetOriginPosition:function() {
    return b2Math.SubtractVV(this.m_position, b2Math.b2MulMV(this.m_R, this.m_center))
},SetCenterPosition:function(a, b) {
    if (this.IsFrozen()) {
        return
    }
    this.m_rotation = b;
    this.m_R.Set(this.m_rotation);
    this.m_position.SetV(a);
    this.m_position0.SetV(this.m_position);
    this.m_rotation0 = this.m_rotation;
    for (var c = this.m_shapeList; c != null; c = c.m_next) {
        c.Synchronize(this.m_position, this.m_R, this.m_position, this.m_R)
    }
    this.m_world.m_broadPhase.Commit()
},GetCenterPosition:function() {
    return this.m_position
},GetRotation:function() {
    return this.m_rotation
},GetRotationMatrix:function() {
    return this.m_R
},SetLinearVelocity:function(a) {
    this.m_linearVelocity.SetV(a)
},GetLinearVelocity:function() {
    return this.m_linearVelocity
},SetAngularVelocity:function(a) {
    this.m_angularVelocity = a
},GetAngularVelocity:function() {
    return this.m_angularVelocity
},ApplyForce:function(b, a) {
    if (this.IsSleeping() == false) {
        this.m_force.Add(b);
        this.m_torque += b2Math.b2CrossVV(b2Math.SubtractVV(a, this.m_position), b)
    }
},ApplyTorque:function(a) {
    if (this.IsSleeping() == false) {
        this.m_torque += a
    }
},ApplyImpulse:function(b, a) {
    if (this.IsSleeping() == false) {
        this.m_linearVelocity.Add(b2Math.MulFV(this.m_invMass, b));
        this.m_angularVelocity += (this.m_invI * b2Math.b2CrossVV(b2Math.SubtractVV(a, this.m_position), b))
    }
},GetMass:function() {
    return this.m_mass
},GetInertia:function() {
    return this.m_I
},GetWorldPoint:function(a) {
    return b2Math.AddVV(this.m_position, b2Math.b2MulMV(this.m_R, a))
},GetWorldVector:function(a) {
    return b2Math.b2MulMV(this.m_R, a)
},GetLocalPoint:function(a) {
    return b2Math.b2MulTMV(this.m_R, b2Math.SubtractVV(a, this.m_position))
},GetLocalVector:function(a) {
    return b2Math.b2MulTMV(this.m_R, a)
},IsStatic:function() {
    return(this.m_flags & b2Body.e_staticFlag) == b2Body.e_staticFlag
},IsFrozen:function() {
    return(this.m_flags & b2Body.e_frozenFlag) == b2Body.e_frozenFlag
},IsSleeping:function() {
    return(this.m_flags & b2Body.e_sleepFlag) == b2Body.e_sleepFlag
},AllowSleeping:function(a) {
    if (a) {
        this.m_flags |= b2Body.e_allowSleepFlag
    } else {
        this.m_flags &= ~b2Body.e_allowSleepFlag;
        this.WakeUp()
    }
},WakeUp:function() {
    this.m_flags &= ~b2Body.e_sleepFlag;
    this.m_sleepTime = 0
},GetShapeList:function() {
    return this.m_shapeList
},GetContactList:function() {
    return this.m_contactList
},GetJointList:function() {
    return this.m_jointList
},GetNext:function() {
    return this.m_next
},GetUserData:function() {
    return this.m_userData
},Destroy:function() {
    var b = this.m_shapeList;
    while (b) {
        var a = b;
        b = b.m_next;
        b2Shape.Destroy(a)
    }
},sMat0:new b2Mat22(),SynchronizeShapes:function() {
    this.sMat0.Set(this.m_rotation0);
    for (var a = this.m_shapeList; a != null; a = a.m_next) {
        a.Synchronize(this.m_position0, this.sMat0, this.m_position, this.m_R)
    }
},QuickSyncShapes:function() {
    for (var a = this.m_shapeList; a != null; a = a.m_next) {
        a.QuickSync(this.m_position, this.m_R)
    }
},IsConnected:function(a) {
    for (var b = this.m_jointList; b != null; b = b.next) {
        if (b.other == a) {
            return b.joint.m_collideConnected == false
        }
    }
    return false
},Freeze:function() {
    this.m_flags |= b2Body.e_frozenFlag;
    this.m_linearVelocity.SetZero();
    this.m_angularVelocity = 0;
    for (var a = this.m_shapeList; a != null; a = a.m_next) {
        a.DestroyProxy()
    }
},m_flags:0,m_position:new b2Vec2(),m_rotation:null,m_R:new b2Mat22(0),m_position0:new b2Vec2(),m_rotation0:null,m_linearVelocity:null,m_angularVelocity:null,m_force:null,m_torque:null,m_center:null,m_world:null,m_prev:null,m_next:null,m_shapeList:null,m_shapeCount:0,m_jointList:null,m_contactList:null,m_mass:null,m_invMass:null,m_I:null,m_invI:null,m_linearDamping:null,m_angularDamping:null,m_sleepTime:null,m_userData:null};
b2Body.e_staticFlag = 1;
b2Body.e_frozenFlag = 2;
b2Body.e_islandFlag = 4;
b2Body.e_sleepFlag = 8;
b2Body.e_allowSleepFlag = 16;
b2Body.e_destroyFlag = 32;
var b2BodyDef = function() {
    this.shapes = new Array();
    this.userData = null;
    for (var a = b2Settings.b2_maxShapesPerBody; a--;) {
        this.shapes[a] = null
    }
    this.position = new b2Vec2(0, 0);
    this.rotation = 0;
    this.linearVelocity = new b2Vec2(0, 0);
    this.angularVelocity = 0;
    this.linearDamping = 0;
    this.angularDamping = 0;
    this.allowSleep = true;
    this.isSleeping = false;
    this.preventRotation = false
};
b2BodyDef.prototype = {userData:null,shapes:new Array(),position:null,rotation:null,linearVelocity:null,angularVelocity:null,linearDamping:null,angularDamping:null,allowSleep:null,isSleeping:null,preventRotation:null,AddShape:function(a) {
    for (var b = 0; b < b2Settings.b2_maxShapesPerBody; ++b) {
        if (this.shapes[b] == null) {
            this.shapes[b] = a;
            break
        }
    }
}};
var b2CollisionFilter = function() {
};
b2CollisionFilter.prototype = {ShouldCollide:function(b, a) {
    if (b.m_groupIndex == a.m_groupIndex && b.m_groupIndex != 0) {
        return b.m_groupIndex > 0
    }
    var c = (b.m_maskBits & a.m_categoryBits) != 0 && (b.m_categoryBits & a.m_maskBits) != 0;
    return c
},};
b2CollisionFilter.b2_defaultFilter = new b2CollisionFilter;
var b2Island = function(e, d, c, a) {
    var b = 0;
    this.m_bodyCapacity = e;
    this.m_contactCapacity = d;
    this.m_jointCapacity = c;
    this.m_bodyCount = 0;
    this.m_contactCount = 0;
    this.m_jointCount = 0;
    this.m_bodies = new Array(e);
    for (b = e; b--;) {
        this.m_bodies[b] = null
    }
    this.m_contacts = new Array(d);
    for (b = d; b--;) {
        this.m_contacts[b] = null
    }
    this.m_joints = new Array(c);
    for (b = c; b--;) {
        this.m_joints[b] = null
    }
    this.m_allocator = a
};
b2Island.prototype = {Clear:function() {
    this.m_bodyCount = 0;
    this.m_contactCount = 0;
    this.m_jointCount = 0
},Solve:function(c, l) {
    var f = 0;
    var k;
    for (f = this.m_bodyCount; f--;) {
        k = this.m_bodies[f];
        if (k.m_invMass == 0) {
            continue
        }
        k.m_linearVelocity.Add(b2Math.MulFV(c.dt, b2Math.AddVV(l, b2Math.MulFV(k.m_invMass, k.m_force))));
        k.m_angularVelocity += c.dt * k.m_invI * k.m_torque;
        k.m_linearVelocity.Multiply(k.m_linearDamping);
        k.m_angularVelocity *= k.m_angularDamping;
        k.m_position0.SetV(k.m_position);
        k.m_rotation0 = k.m_rotation
    }
    var d = new b2ContactSolver(this.m_contacts, this.m_contactCount, this.m_allocator);
    d.PreSolve();
    for (f = this.m_jointCount; f--;) {
        this.m_joints[f].PrepareVelocitySolver()
    }
    for (f = c.iterations; f--;) {
        d.SolveVelocityConstraints();
        for (var e = this.m_jointCount; e--;) {
            this.m_joints[e].SolveVelocityConstraints(c)
        }
    }
    for (f = this.m_bodyCount; f--;) {
        k = this.m_bodies[f];
        if (k.m_invMass == 0) {
            continue
        }
        k.m_position.x += c.dt * k.m_linearVelocity.x;
        k.m_position.y += c.dt * k.m_linearVelocity.y;
        k.m_rotation += c.dt * k.m_angularVelocity;
        k.m_R.Set(k.m_rotation)
    }
    for (f = this.m_jointCount; f--;) {
        this.m_joints[f].PreparePositionSolver()
    }
    if (b2World.s_enablePositionCorrection) {
        for (b2Island.m_positionIterationCount = c.iterations; b2Island.m_positionIterationCount--;) {
            var g = d.SolvePositionConstraints(b2Settings.b2_contactBaumgarte);
            var h = true;
            for (f = this.m_jointCount; f--;) {
                var a = this.m_joints[f].SolvePositionConstraints();
                h = h && a
            }
            if (g && h) {
                break
            }
        }
    }
    d.PostSolve();
    for (f = this.m_bodyCount; f--;) {
        k = this.m_bodies[f];
        if (k.m_invMass == 0) {
            continue
        }
        k.m_R.Set(k.m_rotation);
        k.SynchronizeShapes();
        k.m_force.Set(0, 0);
        k.m_torque = 0
    }
},UpdateSleep:function(g) {
    var f = 0;
    var a;
    var e = Number.MAX_VALUE;
    var d = b2Settings.b2_linearSleepTolerance * b2Settings.b2_linearSleepTolerance;
    var c = b2Settings.b2_angularSleepTolerance * b2Settings.b2_angularSleepTolerance;
    for (f = this.m_bodyCount; f--;) {
        a = this.m_bodies[f];
        if (a.m_invMass == 0) {
            continue
        }
        if ((a.m_flags & b2Body.e_allowSleepFlag) == 0) {
            a.m_sleepTime = 0;
            e = 0
        }
        if ((a.m_flags & b2Body.e_allowSleepFlag) == 0 || a.m_angularVelocity * a.m_angularVelocity > c || b2Math.b2Dot(a.m_linearVelocity, a.m_linearVelocity) > d) {
            a.m_sleepTime = 0;
            e = 0
        } else {
            a.m_sleepTime += g;
            e = b2Math.b2Min(e, a.m_sleepTime)
        }
    }
    if (e >= b2Settings.b2_timeToSleep) {
        for (f = this.m_bodyCount; f--;) {
            a = this.m_bodies[f];
            a.m_flags |= b2Body.e_sleepFlag
        }
    }
},AddBody:function(a) {
    this.m_bodies[this.m_bodyCount++] = a
},AddContact:function(a) {
    this.m_contacts[this.m_contactCount++] = a
},AddJoint:function(a) {
    this.m_joints[this.m_jointCount++] = a
},m_allocator:null,m_bodies:null,m_contacts:null,m_joints:null,m_bodyCount:0,m_jointCount:0,m_contactCount:0,m_bodyCapacity:0,m_contactCapacity:0,m_jointCapacity:0,m_positionError:null};
b2Island.m_positionIterationCount = 0;
var b2TimeStep = function() {
};
b2TimeStep.prototype = {dt:null,inv_dt:null,iterations:0};
var b2ContactNode = function() {
};
b2ContactNode.prototype = {other:null,contact:null,prev:null,next:null,};
var b2Contact = function(b, a) {
    this.m_node1 = new b2ContactNode();
    this.m_node2 = new b2ContactNode();
    this.m_flags = 0;
    if (!b || !a) {
        this.m_shape1 = null;
        this.m_shape2 = null;
        return
    }
    this.m_shape1 = b;
    this.m_shape2 = a;
    this.m_manifoldCount = 0;
    this.m_friction = Math.sqrt(this.m_shape1.m_friction * this.m_shape2.m_friction);
    this.m_restitution = b2Math.b2Max(this.m_shape1.m_restitution, this.m_shape2.m_restitution);
    this.m_prev = null;
    this.m_next = null;
    this.m_node1.contact = null;
    this.m_node1.prev = null;
    this.m_node1.next = null;
    this.m_node1.other = null;
    this.m_node2.contact = null;
    this.m_node2.prev = null;
    this.m_node2.next = null;
    this.m_node2.other = null
};
b2Contact.prototype = {GetManifolds:function() {
    return null
},GetManifoldCount:function() {
    return this.m_manifoldCount
},GetNext:function() {
    return this.m_next
},GetShape1:function() {
    return this.m_shape1
},GetShape2:function() {
    return this.m_shape2
},Evaluate:function() {
},m_flags:0,m_prev:null,m_next:null,m_node1:new b2ContactNode(),m_node2:new b2ContactNode(),m_shape1:null,m_shape2:null,m_manifoldCount:0,m_friction:null,m_restitution:null};
b2Contact.e_islandFlag = 1;
b2Contact.e_destroyFlag = 2;
b2Contact.AddType = function(c, d, b, a) {
    b2Contact.s_registers[b][a].createFcn = c;
    b2Contact.s_registers[b][a].destroyFcn = d;
    b2Contact.s_registers[b][a].primary = true;
    if (b != a) {
        b2Contact.s_registers[a][b].createFcn = c;
        b2Contact.s_registers[a][b].destroyFcn = d;
        b2Contact.s_registers[a][b].primary = false
    }
};
b2Contact.InitializeRegisters = function() {
    b2Contact.s_registers = new Array(b2Shape.e_shapeTypeCount);
    for (var b = b2Shape.e_shapeTypeCount; b--;) {
        b2Contact.s_registers[b] = new Array(b2Shape.e_shapeTypeCount);
        for (var a = b2Shape.e_shapeTypeCount; a--;) {
            b2Contact.s_registers[b][a] = new b2ContactRegister()
        }
    }
    b2Contact.AddType(b2CircleContact.Create, b2CircleContact.Destroy, b2Shape.e_circleShape, b2Shape.e_circleShape);
    b2Contact.AddType(b2PolyAndCircleContact.Create, b2PolyAndCircleContact.Destroy, b2Shape.e_polyShape, b2Shape.e_circleShape);
    b2Contact.AddType(b2PolyContact.Create, b2PolyContact.Destroy, b2Shape.e_polyShape, b2Shape.e_polyShape)
};
b2Contact.Create = function(k, j, a) {
    if (b2Contact.s_initialized == false) {
        b2Contact.InitializeRegisters();
        b2Contact.s_initialized = true
    }
    var e = k.m_type;
    var d = j.m_type;
    var g = b2Contact.s_registers[e][d].createFcn;
    if (g) {
        if (b2Contact.s_registers[e][d].primary) {
            return g(k, j, a)
        } else {
            var h = g(j, k, a);
            for (var f = 0; f < h.GetManifoldCount(); ++f) {
                var b = h.GetManifolds()[f];
                b.normal = b.normal.Negative()
            }
            return h
        }
    } else {
        return null
    }
};
b2Contact.Destroy = function(a, c) {
    if (a.GetManifoldCount() > 0) {
        a.m_shape1.m_body.WakeUp();
        a.m_shape2.m_body.WakeUp()
    }
    var d = a.m_shape1.m_type;
    var b = a.m_shape2.m_type;
    var e = b2Contact.s_registers[d][b].destroyFcn;
    e(a, c)
};
b2Contact.s_registers = null;
b2Contact.s_initialized = false;
var b2ContactConstraint = function() {
    this.normal = new b2Vec2();
    this.points = new Array(b2Settings.b2_maxManifoldPoints);
    for (var a = b2Settings.b2_maxManifoldPoints; a--;) {
        this.points[a] = new b2ContactConstraintPoint()
    }
};
b2ContactConstraint.prototype = {points:null,normal:new b2Vec2(),manifold:null,body1:null,body2:null,friction:null,restitution:null,pointCount:0};
var b2ContactConstraintPoint = function() {
    this.localAnchor1 = new b2Vec2();
    this.localAnchor2 = new b2Vec2()
};
b2ContactConstraintPoint.prototype = {localAnchor1:new b2Vec2(),localAnchor2:new b2Vec2(),normalImpulse:null,tangentImpulse:null,positionImpulse:null,normalMass:null,tangentMass:null,separation:null,velocityBias:null,};
var b2ContactRegister = function() {
};
b2ContactRegister.prototype = {createFcn:null,destroyFcn:null,primary:null,};
var b2ContactSolver = function(o, p, l) {
    this.m_constraints = new Array();
    this.m_allocator = l;
    var U = 0;
    var H;
    var N;
    this.m_constraintCount = 0;
    for (U = p; U--;) {
        this.m_constraintCount += o[U].GetManifoldCount()
    }
    for (U = this.m_constraintCount; U--;) {
        this.m_constraints[U] = new b2ContactConstraint()
    }
    var L = 0;
    for (U = 0; U < p; ++U) {
        var n = o[U];
        var y = n.m_shape1.m_body;
        var x = n.m_shape2.m_body;
        var e = n.GetManifoldCount();
        var K = n.GetManifolds();
        var w = n.m_friction;
        var a = n.m_restitution;
        var u = y.m_linearVelocity.x;
        var s = y.m_linearVelocity.y;
        var f = x.m_linearVelocity.x;
        var d = x.m_linearVelocity.y;
        var G = y.m_angularVelocity;
        var F = x.m_angularVelocity;
        for (var T = 0; T < e; ++T) {
            var B = K[T];
            var J = B.normal.x;
            var I = B.normal.y;
            var V = this.m_constraints[L];
            V.body1 = y;
            V.body2 = x;
            V.manifold = B;
            V.normal.x = J;
            V.normal.y = I;
            V.pointCount = B.pointCount;
            V.friction = w;
            V.restitution = a;
            for (var R = 0; R < V.pointCount; ++R) {
                var z = B.points[R];
                var b = V.points[R];
                b.normalImpulse = z.normalImpulse;
                b.tangentImpulse = z.tangentImpulse;
                b.separation = z.separation;
                var S = z.position.x - y.m_position.x;
                var Q = z.position.y - y.m_position.y;
                var D = z.position.x - x.m_position.x;
                var C = z.position.y - x.m_position.y;
                H = b.localAnchor1;
                N = y.m_R;
                H.x = S * N.col1.x + Q * N.col1.y;
                H.y = S * N.col2.x + Q * N.col2.y;
                H = b.localAnchor2;
                N = x.m_R;
                H.x = D * N.col1.x + C * N.col1.y;
                H.y = D * N.col2.x + C * N.col2.y;
                var m = S * S + Q * Q;
                var E = D * D + C * C;
                var r = S * J + Q * I;
                var q = D * J + C * I;
                var A = y.m_invMass + x.m_invMass;
                A += y.m_invI * (m - r * r) + x.m_invI * (E - q * q);
                b.normalMass = 1 / A;
                var O = I;
                var M = -J;
                var v = S * O + Q * M;
                var t = D * O + C * M;
                var W = y.m_invMass + x.m_invMass;
                W += y.m_invI * (m - v * v) + x.m_invI * (E - t * t);
                b.tangentMass = 1 / W;
                b.velocityBias = 0;
                if (b.separation > 0) {
                    b.velocityBias = -60 * b.separation
                }
                var h = f + (-F * C) - u - (-G * Q);
                var g = d + (F * D) - s - (G * S);
                var P = V.normal.x * h + V.normal.y * g;
                if (P < -b2Settings.b2_velocityThreshold) {
                    b.velocityBias += -V.restitution * P
                }
            }
            ++L
        }
    }
};
b2ContactSolver.prototype = {PreSolve:function() {
    var b;
    var z;
    var r;
    for (var w = this.m_constraintCount; w--;) {
        var A = this.m_constraints[w];
        var o = A.body1;
        var n = A.body2;
        var t = o.m_invMass;
        var m = o.m_invI;
        var s = n.m_invMass;
        var l = n.m_invI;
        var e = A.normal.x;
        var d = A.normal.y;
        var k = d;
        var h = -e;
        var v = 0;
        if (b2World.s_enableWarmStarting) {
            for (v = A.pointCount; v--;) {
                var a = A.points[v];
                var q = a.normalImpulse * e + a.tangentImpulse * k;
                var p = a.normalImpulse * d + a.tangentImpulse * h;
                r = o.m_R;
                b = a.localAnchor1;
                var y = r.col1.x * b.x + r.col2.x * b.y;
                var x = r.col1.y * b.x + r.col2.y * b.y;
                r = n.m_R;
                b = a.localAnchor2;
                var g = r.col1.x * b.x + r.col2.x * b.y;
                var f = r.col1.y * b.x + r.col2.y * b.y;
                o.m_angularVelocity -= m * (y * p - x * q);
                o.m_linearVelocity.x -= t * q;
                o.m_linearVelocity.y -= t * p;
                n.m_angularVelocity += l * (g * p - f * q);
                n.m_linearVelocity.x += s * q;
                n.m_linearVelocity.y += s * p;
                a.positionImpulse = 0
            }
        } else {
            for (v = A.pointCount; v--;) {
                var u = A.points[v];
                u.normalImpulse = 0;
                u.tangentImpulse = 0;
                u.positionImpulse = 0
            }
        }
    }
},SolveVelocityConstraints:function() {
    var D = 0;
    var a;
    var H;
    var G;
    var k;
    var g;
    var A;
    var z;
    var x;
    var J;
    var r;
    var q;
    var s;
    var b;
    for (var E = this.m_constraintCount; E--;) {
        var I = this.m_constraints[E];
        var p = I.body1;
        var o = I.body2;
        var v = p.m_angularVelocity;
        var f = p.m_linearVelocity;
        var y = o.m_angularVelocity;
        var u = o.m_linearVelocity;
        var w = p.m_invMass;
        var n = p.m_invI;
        var t = o.m_invMass;
        var m = o.m_invI;
        var e = I.normal.x;
        var d = I.normal.y;
        var l = d;
        var h = -e;
        for (D = I.pointCount; D--;) {
            a = I.points[D];
            s = p.m_R;
            b = a.localAnchor1;
            H = s.col1.x * b.x + s.col2.x * b.y;
            G = s.col1.y * b.x + s.col2.y * b.y;
            s = o.m_R;
            b = a.localAnchor2;
            k = s.col1.x * b.x + s.col2.x * b.y;
            g = s.col1.y * b.x + s.col2.y * b.y;
            A = u.x + (-y * g) - f.x - (-v * G);
            z = u.y + (y * k) - f.y - (v * H);
            var F = A * e + z * d;
            x = -a.normalMass * (F - a.velocityBias);
            J = b2Math.b2Max(a.normalImpulse + x, 0);
            x = J - a.normalImpulse;
            r = x * e;
            q = x * d;
            f.x -= w * r;
            f.y -= w * q;
            v -= n * (H * q - G * r);
            u.x += t * r;
            u.y += t * q;
            y += m * (k * q - g * r);
            a.normalImpulse = J;
            A = u.x + (-y * g) - f.x - (-v * G);
            z = u.y + (y * k) - f.y - (v * H);
            var C = A * l + z * h;
            x = a.tangentMass * (-C);
            var B = I.friction * a.normalImpulse;
            J = b2Math.b2Clamp(a.tangentImpulse + x, -B, B);
            x = J - a.tangentImpulse;
            r = x * l;
            q = x * h;
            f.x -= w * r;
            f.y -= w * q;
            v -= n * (H * q - G * r);
            u.x += t * r;
            u.y += t * q;
            y += m * (k * q - g * r);
            a.tangentImpulse = J
        }
        p.m_angularVelocity = v;
        o.m_angularVelocity = y
    }
},SolvePositionConstraints:function(v) {
    var w = 0;
    var G;
    var x;
    for (var M = this.m_constraintCount; M--;) {
        var P = this.m_constraints[M];
        var r = P.body1;
        var q = P.body2;
        var f = r.m_position;
        var a = r.m_rotation;
        var m = q.m_position;
        var g = q.m_rotation;
        var D = r.m_invMass;
        var p = r.m_invI;
        var A = q.m_invMass;
        var o = q.m_invI;
        var z = P.normal.x;
        var y = P.normal.y;
        var I = y;
        var H = -z;
        for (var L = P.pointCount; L--;) {
            var b = P.points[L];
            G = r.m_R;
            x = b.localAnchor1;
            var K = G.col1.x * x.x + G.col2.x * x.y;
            var J = G.col1.y * x.x + G.col2.y * x.y;
            G = q.m_R;
            x = b.localAnchor2;
            var u = G.col1.x * x.x + G.col2.x * x.y;
            var t = G.col1.y * x.x + G.col2.y * x.y;
            var e = f.x + K;
            var d = f.y + J;
            var E = m.x + u;
            var B = m.y + t;
            var O = E - e;
            var N = B - d;
            var k = (O * z + N * y) + b.separation;
            w = b2Math.b2Min(w, k);
            var h = v * b2Math.b2Clamp(k + b2Settings.b2_linearSlop, -b2Settings.b2_maxLinearCorrection, 0);
            var s = -b.normalMass * h;
            var F = b.positionImpulse;
            b.positionImpulse = b2Math.b2Max(F + s, 0);
            s = b.positionImpulse - F;
            var n = s * z;
            var l = s * y;
            f.x -= D * n;
            f.y -= D * l;
            a -= p * (K * l - J * n);
            r.m_R.Set(a);
            m.x += A * n;
            m.y += A * l;
            g += o * (u * l - t * n);
            q.m_R.Set(g)
        }
        r.m_rotation = a;
        q.m_rotation = g
    }
    return w >= -b2Settings.b2_linearSlop
},PostSolve:function() {
    for (var d = this.m_constraintCount; d--;) {
        var g = this.m_constraints[d];
        var a = g.manifold;
        for (var b = g.pointCount; b--;) {
            var f = a.points[b];
            var e = g.points[b];
            f.normalImpulse = e.normalImpulse;
            f.tangentImpulse = e.tangentImpulse
        }
    }
},m_allocator:null,m_constraints:new Array(),m_constraintCount:0};
var b2CircleContact = function(b, a) {
    this.m_node1 = new b2ContactNode();
    this.m_node2 = new b2ContactNode();
    this.m_flags = 0;
    if (!b || !a) {
        this.m_shape1 = null;
        this.m_shape2 = null;
        return
    }
    this.m_shape1 = b;
    this.m_shape2 = a;
    this.m_manifoldCount = 0;
    this.m_friction = Math.sqrt(this.m_shape1.m_friction * this.m_shape2.m_friction);
    this.m_restitution = b2Math.b2Max(this.m_shape1.m_restitution, this.m_shape2.m_restitution);
    this.m_prev = null;
    this.m_next = null;
    this.m_node1.contact = null;
    this.m_node1.prev = null;
    this.m_node1.next = null;
    this.m_node1.other = null;
    this.m_node2.contact = null;
    this.m_node2.prev = null;
    this.m_node2.next = null;
    this.m_node2.other = null;
    this.m_manifold = [new b2Manifold()];
    this.m_manifold[0].pointCount = 0;
    this.m_manifold[0].points[0].normalImpulse = 0;
    this.m_manifold[0].points[0].tangentImpulse = 0
};
Object.extend(b2CircleContact.prototype, b2Contact.prototype);
Object.extend(b2CircleContact.prototype, {Evaluate:function() {
    b2Collision.b2CollideCircle(this.m_manifold[0], this.m_shape1, this.m_shape2, false);
    if (this.m_manifold[0].pointCount > 0) {
        this.m_manifoldCount = 1
    } else {
        this.m_manifoldCount = 0
    }
},GetManifolds:function() {
    return this.m_manifold
},m_manifold:[new b2Manifold()]});
b2CircleContact.Create = function(b, a, c) {
    return new b2CircleContact(b, a)
};
b2CircleContact.Destroy = function() {
};
var b2Conservative = function() {
};
b2Conservative.R1 = new b2Mat22();
b2Conservative.R2 = new b2Mat22();
b2Conservative.x1 = new b2Vec2();
b2Conservative.x2 = new b2Vec2();
b2Conservative.Conservative = function(k, j) {
    var i = k.GetBody();
    var h = j.GetBody();
    var s = i.m_position.x - i.m_position0.x;
    var q = i.m_position.y - i.m_position0.y;
    var H = i.m_rotation - i.m_rotation0;
    var b = h.m_position.x - h.m_position0.x;
    var a = h.m_position.y - h.m_position0.y;
    var F = h.m_rotation - h.m_rotation0;
    var m = k.GetMaxRadius();
    var l = j.GetMaxRadius();
    var I = i.m_position0.x;
    var D = i.m_position0.y;
    var z = i.m_rotation0;
    var E = h.m_position0.x;
    var C = h.m_position0.y;
    var n = h.m_rotation0;
    var e = I;
    var c = D;
    var J = z;
    var B = E;
    var A = C;
    var G = n;
    b2Conservative.R1.Set(J);
    b2Conservative.R2.Set(G);
    k.QuickSync(p1, b2Conservative.R1);
    j.QuickSync(p2, b2Conservative.R2);
    var L = 0;
    var o = 10;
    var u;
    var t;
    var y = 0;
    var v = true;
    for (var w = 0; w < o; ++w) {
        var r = b2Distance.Distance(b2Conservative.x1, b2Conservative.x2, k, j);
        if (r < b2Settings.b2_linearSlop) {
            if (w == 0) {
                v = false
            } else {
                v = true
            }
            break
        }
        if (w == 0) {
            u = b2Conservative.x2.x - b2Conservative.x1.x;
            t = b2Conservative.x2.y - b2Conservative.x1.y;
            var f = Math.sqrt(u * u + t * t);
            var x = (u * (s - b) + t * (q - a)) + Math.abs(H) * m + Math.abs(F) * l;
            if (Math.abs(x) < Number.MIN_VALUE) {
                v = false;
                break
            }
            y = 1 / x
        }
        var g = r * y;
        var K = L + g;
        if (K < 0 || 1 < K) {
            v = false;
            break
        }
        if (K < (1 + 100 * Number.MIN_VALUE) * L) {
            v = true;
            break
        }
        L = K;
        e = I + L * v1.x;
        c = D + L * v1.y;
        J = z + L * H;
        B = E + L * v2.x;
        A = C + L * v2.y;
        G = n + L * F;
        b2Conservative.R1.Set(J);
        b2Conservative.R2.Set(G);
        k.QuickSync(p1, b2Conservative.R1);
        j.QuickSync(p2, b2Conservative.R2)
    }
    if (v) {
        u = b2Conservative.x2.x - b2Conservative.x1.x;
        t = b2Conservative.x2.y - b2Conservative.x1.y;
        var p = Math.sqrt(u * u + t * t);
        if (p > FLT_EPSILON) {
            d *= b2_linearSlop / p
        }
        if (i.IsStatic()) {
            i.m_position.x = e;
            i.m_position.y = c
        } else {
            i.m_position.x = e - u;
            i.m_position.y = c - t
        }
        i.m_rotation = J;
        i.m_R.Set(J);
        i.QuickSyncShapes();
        if (h.IsStatic()) {
            h.m_position.x = B;
            h.m_position.y = A
        } else {
            h.m_position.x = B + u;
            h.m_position.y = A + t
        }
        h.m_position.x = B + u;
        h.m_position.y = A + t;
        h.m_rotation = G;
        h.m_R.Set(G);
        h.QuickSyncShapes();
        return true
    }
    k.QuickSync(i.m_position, i.m_R);
    j.QuickSync(h.m_position, h.m_R);
    return false
};
var b2NullContact = function(b, a) {
    this.m_node1 = new b2ContactNode();
    this.m_node2 = new b2ContactNode();
    this.m_flags = 0;
    if (!b || !a) {
        this.m_shape1 = null;
        this.m_shape2 = null;
        return
    }
    this.m_shape1 = b;
    this.m_shape2 = a;
    this.m_manifoldCount = 0;
    this.m_friction = Math.sqrt(this.m_shape1.m_friction * this.m_shape2.m_friction);
    this.m_restitution = b2Math.b2Max(this.m_shape1.m_restitution, this.m_shape2.m_restitution);
    this.m_prev = null;
    this.m_next = null;
    this.m_node1.contact = null;
    this.m_node1.prev = null;
    this.m_node1.next = null;
    this.m_node1.other = null;
    this.m_node2.contact = null;
    this.m_node2.prev = null;
    this.m_node2.next = null;
    this.m_node2.other = null
};
Object.extend(b2NullContact.prototype, b2Contact.prototype);
Object.extend(b2NullContact.prototype, {Evaluate:function() {
},GetManifolds:function() {
    return null
}});
var b2PolyAndCircleContact = function(b, a) {
    this.m_node1 = new b2ContactNode();
    this.m_node2 = new b2ContactNode();
    this.m_flags = 0;
    if (!b || !a) {
        this.m_shape1 = null;
        this.m_shape2 = null;
        return
    }
    this.m_shape1 = b;
    this.m_shape2 = a;
    this.m_manifoldCount = 0;
    this.m_friction = Math.sqrt(this.m_shape1.m_friction * this.m_shape2.m_friction);
    this.m_restitution = b2Math.b2Max(this.m_shape1.m_restitution, this.m_shape2.m_restitution);
    this.m_prev = null;
    this.m_next = null;
    this.m_node1.contact = null;
    this.m_node1.prev = null;
    this.m_node1.next = null;
    this.m_node1.other = null;
    this.m_node2.contact = null;
    this.m_node2.prev = null;
    this.m_node2.next = null;
    this.m_node2.other = null;
    this.m_manifold = [new b2Manifold()];
    this.m_manifold[0].pointCount = 0;
    this.m_manifold[0].points[0].normalImpulse = 0;
    this.m_manifold[0].points[0].tangentImpulse = 0
};
Object.extend(b2PolyAndCircleContact.prototype, b2Contact.prototype);
Object.extend(b2PolyAndCircleContact.prototype, {Evaluate:function() {
    b2Collision.b2CollidePolyAndCircle(this.m_manifold[0], this.m_shape1, this.m_shape2, false);
    if (this.m_manifold[0].pointCount > 0) {
        this.m_manifoldCount = 1
    } else {
        this.m_manifoldCount = 0
    }
},GetManifolds:function() {
    return this.m_manifold
},m_manifold:[new b2Manifold()]});
b2PolyAndCircleContact.Create = function(b, a, c) {
    return new b2PolyAndCircleContact(b, a)
};
b2PolyAndCircleContact.Destroy = function(a, b) {
};
var b2PolyContact = function(b, a) {
    this.m_node1 = new b2ContactNode();
    this.m_node2 = new b2ContactNode();
    this.m_flags = 0;
    if (!b || !a) {
        this.m_shape1 = null;
        this.m_shape2 = null;
        return
    }
    this.m_shape1 = b;
    this.m_shape2 = a;
    this.m_manifoldCount = 0;
    this.m_friction = Math.sqrt(this.m_shape1.m_friction * this.m_shape2.m_friction);
    this.m_restitution = b2Math.b2Max(this.m_shape1.m_restitution, this.m_shape2.m_restitution);
    this.m_prev = null;
    this.m_next = null;
    this.m_node1.contact = null;
    this.m_node1.prev = null;
    this.m_node1.next = null;
    this.m_node1.other = null;
    this.m_node2.contact = null;
    this.m_node2.prev = null;
    this.m_node2.next = null;
    this.m_node2.other = null;
    this.m0 = new b2Manifold();
    this.m_manifold = [new b2Manifold()];
    this.m_manifold[0].pointCount = 0
};
Object.extend(b2PolyContact.prototype, b2Contact.prototype);
Object.extend(b2PolyContact.prototype, {m0:new b2Manifold(),Evaluate:function() {
    var a = this.m_manifold[0];
    var b = this.m0.points;
    for (var d = a.pointCount; d--;) {
        var c = b[d];
        var o = a.points[d];
        c.normalImpulse = o.normalImpulse;
        c.tangentImpulse = o.tangentImpulse;
        c.id = o.id.Copy()
    }
    this.m0.pointCount = a.pointCount;
    b2Collision.b2CollidePoly(a, this.m_shape1, this.m_shape2, false);
    if (a.pointCount > 0) {
        var h = [false,false];
        for (var f = a.pointCount; f--;) {
            var m = a.points[f];
            m.normalImpulse = 0;
            m.tangentImpulse = 0;
            var l = m.id.key;
            for (var e = this.m0.pointCount; e--;) {
                if (h[e] == true) {
                    continue
                }
                var g = this.m0.points[e];
                var n = g.id;
                if (n.key == l) {
                    h[e] = true;
                    m.normalImpulse = g.normalImpulse;
                    m.tangentImpulse = g.tangentImpulse;
                    break
                }
            }
        }
        this.m_manifoldCount = 1
    } else {
        this.m_manifoldCount = 0
    }
},GetManifolds:function() {
    return this.m_manifold
},m_manifold:[new b2Manifold()]});
b2PolyContact.Create = function(b, a, c) {
    return new b2PolyContact(b, a)
};
b2PolyContact.Destroy = function() {
};
var b2ContactManager = function() {
    this.m_nullContact = new b2NullContact();
    this.m_world = null;
    this.m_destroyImmediate = false
};
Object.extend(b2ContactManager.prototype, b2PairCallback.prototype);
Object.extend(b2ContactManager.prototype, {PairAdded:function(f, d) {
    var i = f;
    var g = d;
    var a = i.m_body;
    var h = g.m_body;
    if (a.IsStatic() && h.IsStatic()) {
        return this.m_nullContact
    }
    if (i.m_body == g.m_body) {
        return this.m_nullContact
    }
    if (h.IsConnected(a)) {
        return this.m_nullContact
    }
    if (this.m_world.m_filter != null && this.m_world.m_filter.ShouldCollide(i, g) == false) {
        return this.m_nullContact
    }
    if (h.m_invMass == 0) {
        var e = i;
        i = g;
        g = e;
        var c = a;
        a = h;
        h = c
    }
    var b = b2Contact.Create(i, g, this.m_world.m_blockAllocator);
    if (b == null) {
        return this.m_nullContact
    } else {
        b.m_prev = null;
        b.m_next = this.m_world.m_contactList;
        if (this.m_world.m_contactList != null) {
            this.m_world.m_contactList.m_prev = b
        }
        this.m_world.m_contactList = b;
        this.m_world.m_contactCount++
    }
    return b
},PairRemoved:function(e, b, a) {
    if (a == null) {
        return
    }
    var d = a;
    if (d != this.m_nullContact) {
        if (this.m_destroyImmediate == true) {
            this.DestroyContact(d);
            d = null
        } else {
            d.m_flags |= b2Contact.e_destroyFlag
        }
    }
},DestroyContact:function(f) {
    if (f.m_prev) {
        f.m_prev.m_next = f.m_next
    }
    if (f.m_next) {
        f.m_next.m_prev = f.m_prev
    }
    if (f == this.m_world.m_contactList) {
        this.m_world.m_contactList = f.m_next
    }
    if (f.GetManifoldCount() > 0) {
        var e = f.m_shape1.m_body;
        var d = f.m_shape2.m_body;
        var b = f.m_node1;
        var a = f.m_node2;
        e.WakeUp();
        d.WakeUp();
        if (b.prev) {
            b.prev.next = b.next
        }
        if (b.next) {
            b.next.prev = b.prev
        }
        if (b == e.m_contactList) {
            e.m_contactList = b.next
        }
        b.prev = null;
        b.next = null;
        if (a.prev) {
            a.prev.next = a.next
        }
        if (a.next) {
            a.next.prev = a.prev
        }
        if (a == d.m_contactList) {
            d.m_contactList = a.next
        }
        a.prev = null;
        a.next = null
    }
    b2Contact.Destroy(f, this.m_world.m_blockAllocator);
    --this.m_world.m_contactCount
},CleanContactList:function() {
    var b = this.m_world.m_contactList;
    while (b != null) {
        var a = b;
        b = b.m_next;
        if (a.m_flags & b2Contact.e_destroyFlag) {
            this.DestroyContact(a);
            a = null
        }
    }
},Collide:function() {
    var f;
    var e;
    var d;
    var a;
    for (var h = this.m_world.m_contactList; h != null; h = h.m_next) {
        if (h.m_shape1.m_body.IsSleeping() && h.m_shape2.m_body.IsSleeping()) {
            continue
        }
        var b = h.GetManifoldCount();
        h.Evaluate();
        var g = h.GetManifoldCount();
        if (b == 0 && g > 0) {
            f = h.m_shape1.m_body;
            e = h.m_shape2.m_body;
            d = h.m_node1;
            a = h.m_node2;
            d.contact = h;
            d.other = e;
            d.prev = null;
            d.next = f.m_contactList;
            if (d.next != null) {
                d.next.prev = h.m_node1
            }
            f.m_contactList = h.m_node1;
            a.contact = h;
            a.other = f;
            a.prev = null;
            a.next = e.m_contactList;
            if (a.next != null) {
                a.next.prev = a
            }
            e.m_contactList = a
        } else {
            if (b > 0 && g == 0) {
                f = h.m_shape1.m_body;
                e = h.m_shape2.m_body;
                d = h.m_node1;
                a = h.m_node2;
                if (d.prev) {
                    d.prev.next = d.next
                }
                if (d.next) {
                    d.next.prev = d.prev
                }
                if (d == f.m_contactList) {
                    f.m_contactList = d.next
                }
                d.prev = null;
                d.next = null;
                if (a.prev) {
                    a.prev.next = a.next
                }
                if (a.next) {
                    a.next.prev = a.prev
                }
                if (a == e.m_contactList) {
                    e.m_contactList = a.next
                }
                a.prev = null;
                a.next = null
            }
        }
    }
},m_world:null,m_nullContact:new b2NullContact(),m_destroyImmediate:null});
var b2World = function(a, d, c) {
    this.step = new b2TimeStep();
    this.m_contactManager = new b2ContactManager();
    this.m_listener = null;
    this.m_filter = b2CollisionFilter.b2_defaultFilter;
    this.m_bodyList = null;
    this.m_contactList = null;
    this.m_jointList = null;
    this.m_bodyCount = 0;
    this.m_contactCount = 0;
    this.m_jointCount = 0;
    this.m_bodyDestroyList = null;
    this.m_allowSleep = c;
    this.m_gravity = d;
    this.m_contactManager.m_world = this;
    this.m_broadPhase = new b2BroadPhase(a, this.m_contactManager);
    var b = new b2BodyDef();
    this.m_groundBody = this.CreateBody(b)
};
b2World.prototype = {SetListener:function(a) {
    this.m_listener = a
},SetFilter:function(a) {
    this.m_filter = a
},CreateBody:function(c) {
    var a = new b2Body(c, this);
    a.m_prev = null;
    a.m_next = this.m_bodyList;
    if (this.m_bodyList) {
        this.m_bodyList.m_prev = a
    }
    this.m_bodyList = a;
    ++this.m_bodyCount;
    return a
},DestroyBody:function(a) {
    if (a.m_flags & b2Body.e_destroyFlag) {
        return
    }
    if (a.m_prev) {
        a.m_prev.m_next = a.m_next
    }
    if (a.m_next) {
        a.m_next.m_prev = a.m_prev
    }
    if (a == this.m_bodyList) {
        this.m_bodyList = a.m_next
    }
    a.m_flags |= b2Body.e_destroyFlag;
    --this.m_bodyCount;
    a.m_prev = null;
    a.m_next = this.m_bodyDestroyList;
    this.m_bodyDestroyList = a
},CleanBodyList:function() {
    this.m_contactManager.m_destroyImmediate = true;
    var c = this.m_bodyDestroyList;
    while (c) {
        var e = c;
        c = c.m_next;
        var d = e.m_jointList;
        while (d) {
            var a = d;
            d = d.next;
            if (this.m_listener) {
                this.m_listener.NotifyJointDestroyed(a.joint)
            }
            this.DestroyJoint(a.joint)
        }
        e.Destroy()
    }
    this.m_bodyDestroyList = null;
    this.m_contactManager.m_destroyImmediate = false
},CreateJoint:function(e) {
    var c = b2Joint.Create(e);
    c.m_prev = null;
    c.m_next = this.m_jointList;
    if (this.m_jointList) {
        this.m_jointList.m_prev = c
    }
    this.m_jointList = c;
    ++this.m_jointCount;
    c.m_node1.joint = c;
    c.m_node1.other = c.m_body2;
    c.m_node1.prev = null;
    c.m_node1.next = c.m_body1.m_jointList;
    if (c.m_body1.m_jointList) {
        c.m_body1.m_jointList.prev = c.m_node1
    }
    c.m_body1.m_jointList = c.m_node1;
    c.m_node2.joint = c;
    c.m_node2.other = c.m_body1;
    c.m_node2.prev = null;
    c.m_node2.next = c.m_body2.m_jointList;
    if (c.m_body2.m_jointList) {
        c.m_body2.m_jointList.prev = c.m_node2
    }
    c.m_body2.m_jointList = c.m_node2;
    if (e.collideConnected == false) {
        var a = e.body1.m_shapeCount < e.body2.m_shapeCount ? e.body1 : e.body2;
        for (var d = a.m_shapeList; d; d = d.m_next) {
            d.ResetProxy(this.m_broadPhase)
        }
    }
    return c
},DestroyJoint:function(e) {
    var g = e.m_collideConnected;
    if (e.m_prev) {
        e.m_prev.m_next = e.m_next
    }
    if (e.m_next) {
        e.m_next.m_prev = e.m_prev
    }
    if (e == this.m_jointList) {
        this.m_jointList = e.m_next
    }
    var d = e.m_body1;
    var c = e.m_body2;
    d.WakeUp();
    c.WakeUp();
    if (e.m_node1.prev) {
        e.m_node1.prev.next = e.m_node1.next
    }
    if (e.m_node1.next) {
        e.m_node1.next.prev = e.m_node1.prev
    }
    if (e.m_node1 == d.m_jointList) {
        d.m_jointList = e.m_node1.next
    }
    e.m_node1.prev = null;
    e.m_node1.next = null;
    if (e.m_node2.prev) {
        e.m_node2.prev.next = e.m_node2.next
    }
    if (e.m_node2.next) {
        e.m_node2.next.prev = e.m_node2.prev
    }
    if (e.m_node2 == c.m_jointList) {
        c.m_jointList = e.m_node2.next
    }
    e.m_node2.prev = null;
    e.m_node2.next = null;
    b2Joint.Destroy(e, this.m_blockAllocator);
    --this.m_jointCount;
    if (g == false) {
        var a = d.m_shapeCount < c.m_shapeCount ? d : c;
        for (var f = a.m_shapeList; f; f = f.m_next) {
            f.ResetProxy(this.m_broadPhase)
        }
    }
},GetGroundBody:function() {
    return this.m_groundBody
},step:new b2TimeStep(),Step:function(a, d) {
    var r;
    var o;
    this.step.dt = a;
    this.step.iterations = d;
    if (a > 0) {
        this.step.inv_dt = 1 / a
    } else {
        this.step.inv_dt = 0
    }
    this.m_positionIterationCount = 0;
    this.m_contactManager.CleanContactList();
    this.CleanBodyList();
    this.m_contactManager.Collide();
    var n = new b2Island(this.m_bodyCount, this.m_contactCount, this.m_jointCount, this.m_stackAllocator);
    for (r = this.m_bodyList; r != null; r = r.m_next) {
        r.m_flags &= ~b2Body.e_islandFlag
    }
    for (var p = this.m_contactList; p != null; p = p.m_next) {
        p.m_flags &= ~b2Contact.e_islandFlag
    }
    for (var h = this.m_jointList; h != null; h = h.m_next) {
        h.m_islandFlag = false
    }
    var u = this.m_bodyCount;
    var q = new Array(this.m_bodyCount);
    for (var g = this.m_bodyCount; g--;) {
        q[g] = null
    }
    for (var m = this.m_bodyList; m != null; m = m.m_next) {
        if (m.m_flags & (b2Body.e_staticFlag | b2Body.e_islandFlag | b2Body.e_sleepFlag | b2Body.e_frozenFlag)) {
            continue
        }
        n.Clear();
        var t = 0;
        q[t++] = m;
        m.m_flags |= b2Body.e_islandFlag;
        while (t > 0) {
            r = q[--t];
            n.AddBody(r);
            r.m_flags &= ~b2Body.e_sleepFlag;
            if (r.m_flags & b2Body.e_staticFlag) {
                continue
            }
            for (var s = r.m_contactList; s != null; s = s.next) {
                if (s.contact.m_flags & b2Contact.e_islandFlag) {
                    continue
                }
                n.AddContact(s.contact);
                s.contact.m_flags |= b2Contact.e_islandFlag;
                o = s.other;
                if (o.m_flags & b2Body.e_islandFlag) {
                    continue
                }
                q[t++] = o;
                o.m_flags |= b2Body.e_islandFlag
            }
            for (var f = r.m_jointList; f != null; f = f.next) {
                if (f.joint.m_islandFlag == true) {
                    continue
                }
                n.AddJoint(f.joint);
                f.joint.m_islandFlag = true;
                o = f.other;
                if (o.m_flags & b2Body.e_islandFlag) {
                    continue
                }
                q[t++] = o;
                o.m_flags |= b2Body.e_islandFlag
            }
        }
        n.Solve(this.step, this.m_gravity);
        this.m_positionIterationCount = b2Math.b2Max(this.m_positionIterationCount, b2Island.m_positionIterationCount);
        if (this.m_allowSleep) {
            n.UpdateSleep(a)
        }
        for (var l = n.m_bodyCount; l--;) {
            r = n.m_bodies[l];
            if (r.m_flags & b2Body.e_staticFlag) {
                r.m_flags &= ~b2Body.e_islandFlag
            }
            if (r.IsFrozen() && this.m_listener) {
                var e = this.m_listener.NotifyBoundaryViolated(r);
                if (e == b2WorldListener.b2_destroyBody) {
                    this.DestroyBody(r);
                    r = null;
                    n.m_bodies[l] = null
                }
            }
        }
    }
    this.m_broadPhase.Commit()
},Query:function(b, a, f) {
    var d = new Array();
    var e = this.m_broadPhase.QueryAABB(b, d, f);
    for (var c = e; c--;) {
        a[c] = d[c]
    }
    return e
},GetBodyList:function() {
    return this.m_bodyList
},GetJointList:function() {
    return this.m_jointList
},GetContactList:function() {
    return this.m_contactList
},m_stackAllocator:null,m_broadPhase:null,m_contactManager:new b2ContactManager(),m_bodyList:null,m_contactList:null,m_jointList:null,m_bodyCount:0,m_contactCount:0,m_jointCount:0,m_bodyDestroyList:null,m_gravity:null,m_allowSleep:null,m_groundBody:null,m_listener:null,m_filter:null,m_positionIterationCount:0};
b2World.s_enablePositionCorrection = 1;
b2World.s_enableWarmStarting = 1;
var b2WorldListener = function() {
};
b2WorldListener.prototype = {NotifyJointDestroyed:function(a) {
},NotifyBoundaryViolated:function(a) {
    return b2WorldListener.b2_freezeBody
},};
b2WorldListener.b2_freezeBody = 0;
b2WorldListener.b2_destroyBody = 1;
var b2JointNode = function() {
};
b2JointNode.prototype = {other:null,joint:null,prev:null,next:null};
var b2Joint = function(a) {
    this.m_node1 = new b2JointNode();
    this.m_node2 = new b2JointNode();
    this.m_type = a.type;
    this.m_prev = null;
    this.m_next = null;
    this.m_body1 = a.body1;
    this.m_body2 = a.body2;
    this.m_collideConnected = a.collideConnected;
    this.m_islandFlag = false;
    this.m_userData = a.userData
};
b2Joint.prototype = {GetType:function() {
    return this.m_type
},GetAnchor1:function() {
    return null
},GetAnchor2:function() {
    return null
},GetReactionForce:function(a) {
    return null
},GetReactionTorque:function(a) {
    return 0
},GetBody1:function() {
    return this.m_body1
},GetBody2:function() {
    return this.m_body2
},GetNext:function() {
    return this.m_next
},GetUserData:function() {
    return this.m_userData
},PrepareVelocitySolver:function() {
},SolveVelocityConstraints:function(a) {
},PreparePositionSolver:function() {
},SolvePositionConstraints:function() {
    return false
},m_type:0,m_prev:null,m_next:null,m_node1:new b2JointNode(),m_node2:new b2JointNode(),m_body1:null,m_body2:null,m_islandFlag:null,m_collideConnected:null,m_userData:null};
b2Joint.Create = function(a) {
    var b = null;
    switch (a.type) {
        case b2Joint.e_distanceJoint:
            b = new b2DistanceJoint(a);
            break;
        case b2Joint.e_springJoint:
            b = new b2SpringJoint(a);
            break;
        case b2Joint.e_mouseJoint:
            b = new b2MouseJoint(a);
            break;
        case b2Joint.e_prismaticJoint:
            b = new b2PrismaticJoint(a);
            break;
        case b2Joint.e_revoluteJoint:
            b = new b2RevoluteJoint(a);
            break;
        case b2Joint.e_pulleyJoint:
            b = new b2PulleyJoint(a);
            break;
        case b2Joint.e_gearJoint:
            b = new b2GearJoint(a);
            break;
        default:
            break
    }
    return b
};
b2Joint.Destroy = function(b, a) {
};
b2Joint.e_unknownJoint = 0;
b2Joint.e_revoluteJoint = 1;
b2Joint.e_prismaticJoint = 2;
b2Joint.e_distanceJoint = 3;
b2Joint.e_pulleyJoint = 4;
b2Joint.e_mouseJoint = 5;
b2Joint.e_gearJoint = 6;
b2Joint.e_springJoint = 7;
b2Joint.e_inactiveLimit = 0;
b2Joint.e_atLowerLimit = 1;
b2Joint.e_atUpperLimit = 2;
b2Joint.e_equalLimits = 3;
var b2JointDef = function() {
    this.type = b2Joint.e_unknownJoint;
    this.userData = null;
    this.body1 = null;
    this.body2 = null;
    this.collideConnected = false
};
var b2DistanceJoint = function(c) {
    this.m_node1 = new b2JointNode();
    this.m_node2 = new b2JointNode();
    this.m_type = c.type;
    this.m_prev = null;
    this.m_next = null;
    this.m_body1 = c.body1;
    this.m_body2 = c.body2;
    this.m_collideConnected = c.collideConnected;
    this.m_islandFlag = false;
    this.m_userData = c.userData;
    this.m_localAnchor1 = new b2Vec2();
    this.m_localAnchor2 = new b2Vec2();
    this.m_u = new b2Vec2();
    var b;
    var a;
    var d;
    b = this.m_body1.m_R;
    a = c.anchorPoint1.x - this.m_body1.m_position.x;
    d = c.anchorPoint1.y - this.m_body1.m_position.y;
    this.m_localAnchor1.x = a * b.col1.x + d * b.col1.y;
    this.m_localAnchor1.y = a * b.col2.x + d * b.col2.y;
    b = this.m_body2.m_R;
    a = c.anchorPoint2.x - this.m_body2.m_position.x;
    d = c.anchorPoint2.y - this.m_body2.m_position.y;
    this.m_localAnchor2.x = a * b.col1.x + d * b.col1.y;
    this.m_localAnchor2.y = a * b.col2.x + d * b.col2.y;
    a = c.anchorPoint2.x - c.anchorPoint1.x;
    d = c.anchorPoint2.y - c.anchorPoint1.y;
    this.m_length = Math.sqrt(a * a + d * d);
    this.m_impulse = 0
};
Object.extend(b2DistanceJoint.prototype, b2Joint.prototype);
Object.extend(b2DistanceJoint.prototype, {PrepareVelocitySolver:function() {
    var g;
    g = this.m_body1.m_R;
    var j = g.col1.x * this.m_localAnchor1.x + g.col2.x * this.m_localAnchor1.y;
    var i = g.col1.y * this.m_localAnchor1.x + g.col2.y * this.m_localAnchor1.y;
    g = this.m_body2.m_R;
    var f = g.col1.x * this.m_localAnchor2.x + g.col2.x * this.m_localAnchor2.y;
    var e = g.col1.y * this.m_localAnchor2.x + g.col2.y * this.m_localAnchor2.y;
    this.m_u.x = this.m_body2.m_position.x + f - this.m_body1.m_position.x - j;
    this.m_u.y = this.m_body2.m_position.y + e - this.m_body1.m_position.y - i;
    var a = Math.sqrt(this.m_u.x * this.m_u.x + this.m_u.y * this.m_u.y);
    if (a > b2Settings.b2_linearSlop) {
        this.m_u.Multiply(1 / a)
    } else {
        this.m_u.SetZero()
    }
    var h = (j * this.m_u.y - i * this.m_u.x);
    var d = (f * this.m_u.y - e * this.m_u.x);
    this.m_mass = this.m_body1.m_invMass + this.m_body1.m_invI * h * h + this.m_body2.m_invMass + this.m_body2.m_invI * d * d;
    this.m_mass = 1 / this.m_mass;
    if (b2World.s_enableWarmStarting) {
        var c = this.m_impulse * this.m_u.x;
        var b = this.m_impulse * this.m_u.y;
        this.m_body1.m_linearVelocity.x -= this.m_body1.m_invMass * c;
        this.m_body1.m_linearVelocity.y -= this.m_body1.m_invMass * b;
        this.m_body1.m_angularVelocity -= this.m_body1.m_invI * (j * b - i * c);
        this.m_body2.m_linearVelocity.x += this.m_body2.m_invMass * c;
        this.m_body2.m_linearVelocity.y += this.m_body2.m_invMass * b;
        this.m_body2.m_angularVelocity += this.m_body2.m_invI * (f * b - e * c)
    } else {
        this.m_impulse = 0
    }
},SolveVelocityConstraints:function(b) {
    var j;
    j = this.m_body1.m_R;
    var n = j.col1.x * this.m_localAnchor1.x + j.col2.x * this.m_localAnchor1.y;
    var m = j.col1.y * this.m_localAnchor1.x + j.col2.y * this.m_localAnchor1.y;
    j = this.m_body2.m_R;
    var h = j.col1.x * this.m_localAnchor2.x + j.col2.x * this.m_localAnchor2.y;
    var g = j.col1.y * this.m_localAnchor2.x + j.col2.y * this.m_localAnchor2.y;
    var l = this.m_body1.m_linearVelocity.x + (-this.m_body1.m_angularVelocity * m);
    var k = this.m_body1.m_linearVelocity.y + (this.m_body1.m_angularVelocity * n);
    var f = this.m_body2.m_linearVelocity.x + (-this.m_body2.m_angularVelocity * g);
    var e = this.m_body2.m_linearVelocity.y + (this.m_body2.m_angularVelocity * h);
    var i = (this.m_u.x * (f - l) + this.m_u.y * (e - k));
    var a = -this.m_mass * i;
    this.m_impulse += a;
    var d = a * this.m_u.x;
    var c = a * this.m_u.y;
    this.m_body1.m_linearVelocity.x -= this.m_body1.m_invMass * d;
    this.m_body1.m_linearVelocity.y -= this.m_body1.m_invMass * c;
    this.m_body1.m_angularVelocity -= this.m_body1.m_invI * (n * c - m * d);
    this.m_body2.m_linearVelocity.x += this.m_body2.m_invMass * d;
    this.m_body2.m_linearVelocity.y += this.m_body2.m_invMass * c;
    this.m_body2.m_angularVelocity += this.m_body2.m_invI * (h * c - g * d)
},SolvePositionConstraints:function() {
    var j;
    j = this.m_body1.m_R;
    var l = j.col1.x * this.m_localAnchor1.x + j.col2.x * this.m_localAnchor1.y;
    var k = j.col1.y * this.m_localAnchor1.x + j.col2.y * this.m_localAnchor1.y;
    j = this.m_body2.m_R;
    var i = j.col1.x * this.m_localAnchor2.x + j.col2.x * this.m_localAnchor2.y;
    var h = j.col1.y * this.m_localAnchor2.x + j.col2.y * this.m_localAnchor2.y;
    var g = this.m_body2.m_position.x + i - this.m_body1.m_position.x - l;
    var f = this.m_body2.m_position.y + h - this.m_body1.m_position.y - k;
    var c = Math.sqrt(g * g + f * f);
    g /= c;
    f /= c;
    var a = c - this.m_length;
    a = b2Math.b2Clamp(a, -b2Settings.b2_maxLinearCorrection, b2Settings.b2_maxLinearCorrection);
    var b = -this.m_mass * a;
    this.m_u.Set(g, f);
    var e = b * this.m_u.x;
    var d = b * this.m_u.y;
    this.m_body1.m_position.x -= this.m_body1.m_invMass * e;
    this.m_body1.m_position.y -= this.m_body1.m_invMass * d;
    this.m_body1.m_rotation -= this.m_body1.m_invI * (l * d - k * e);
    this.m_body2.m_position.x += this.m_body2.m_invMass * e;
    this.m_body2.m_position.y += this.m_body2.m_invMass * d;
    this.m_body2.m_rotation += this.m_body2.m_invI * (i * d - h * e);
    this.m_body1.m_R.Set(this.m_body1.m_rotation);
    this.m_body2.m_R.Set(this.m_body2.m_rotation);
    return b2Math.b2Abs(a) < b2Settings.b2_linearSlop
},GetAnchor1:function() {
    return b2Math.AddVV(this.m_body1.m_position, b2Math.b2MulMV(this.m_body1.m_R, this.m_localAnchor1))
},GetAnchor2:function() {
    return b2Math.AddVV(this.m_body2.m_position, b2Math.b2MulMV(this.m_body2.m_R, this.m_localAnchor2))
},GetReactionForce:function(a) {
    var b = new b2Vec2();
    b.SetV(this.m_u);
    b.Multiply(this.m_impulse * a);
    return b
},GetReactionTorque:function(a) {
    return 0
},m_localAnchor1:null,m_localAnchor2:null,m_u:new b2Vec2(),m_impulse:null,m_mass:null,m_length:null});
var b2DistanceJointDef = function() {
    this.type = b2Joint.e_unknownJoint;
    this.userData = null;
    this.body1 = null;
    this.body2 = null;
    this.collideConnected = false;
    this.anchorPoint1 = new b2Vec2(0, 0);
    this.anchorPoint2 = new b2Vec2(0, 0);
    this.type = b2Joint.e_distanceJoint
};
Object.extend(b2DistanceJointDef.prototype, b2JointDef.prototype);
Object.extend(b2DistanceJointDef.prototype, {anchorPoint1:null,anchorPoint2:null});
var b2Jacobian = function() {
    this.linear1 = new b2Vec2();
    this.linear2 = new b2Vec2()
};
b2Jacobian.prototype = {linear1:new b2Vec2(),angular1:null,linear2:new b2Vec2(),angular2:null,SetZero:function() {
    this.linear1.SetZero();
    this.angular1 = 0;
    this.linear2.SetZero();
    this.angular2 = 0
},Set:function(d, b, c, a) {
    this.linear1.SetV(d);
    this.angular1 = b;
    this.linear2.SetV(c);
    this.angular2 = a
},Compute:function(d, b, c, a) {
    return(this.linear1.x * d.x + this.linear1.y * d.y) + this.angular1 * b + (this.linear2.x * c.x + this.linear2.y * c.y) + this.angular2 * a
},};
var b2GearJoint = function(a) {
    this.m_node1 = new b2JointNode();
    this.m_node2 = new b2JointNode();
    this.m_type = a.type;
    this.m_prev = null;
    this.m_next = null;
    this.m_body1 = a.body1;
    this.m_body2 = a.body2;
    this.m_collideConnected = a.collideConnected;
    this.m_islandFlag = false;
    this.m_userData = a.userData;
    this.m_groundAnchor1 = new b2Vec2();
    this.m_groundAnchor2 = new b2Vec2();
    this.m_localAnchor1 = new b2Vec2();
    this.m_localAnchor2 = new b2Vec2();
    this.m_J = new b2Jacobian();
    this.m_revolute1 = null;
    this.m_prismatic1 = null;
    this.m_revolute2 = null;
    this.m_prismatic2 = null;
    var c;
    var b;
    this.m_ground1 = a.joint1.m_body1;
    this.m_body1 = a.joint1.m_body2;
    if (a.joint1.m_type == b2Joint.e_revoluteJoint) {
        this.m_revolute1 = a.joint1;
        this.m_groundAnchor1.SetV(this.m_revolute1.m_localAnchor1);
        this.m_localAnchor1.SetV(this.m_revolute1.m_localAnchor2);
        c = this.m_revolute1.GetJointAngle()
    } else {
        this.m_prismatic1 = a.joint1;
        this.m_groundAnchor1.SetV(this.m_prismatic1.m_localAnchor1);
        this.m_localAnchor1.SetV(this.m_prismatic1.m_localAnchor2);
        c = this.m_prismatic1.GetJointTranslation()
    }
    this.m_ground2 = a.joint2.m_body1;
    this.m_body2 = a.joint2.m_body2;
    if (a.joint2.m_type == b2Joint.e_revoluteJoint) {
        this.m_revolute2 = a.joint2;
        this.m_groundAnchor2.SetV(this.m_revolute2.m_localAnchor1);
        this.m_localAnchor2.SetV(this.m_revolute2.m_localAnchor2);
        b = this.m_revolute2.GetJointAngle()
    } else {
        this.m_prismatic2 = a.joint2;
        this.m_groundAnchor2.SetV(this.m_prismatic2.m_localAnchor1);
        this.m_localAnchor2.SetV(this.m_prismatic2.m_localAnchor2);
        b = this.m_prismatic2.GetJointTranslation()
    }
    this.m_ratio = a.ratio;
    this.m_constant = c + this.m_ratio * b;
    this.m_impulse = 0
};
Object.extend(b2GearJoint.prototype, b2Joint.prototype);
Object.extend(b2GearJoint.prototype, {GetAnchor1:function() {
    var a = this.m_body1.m_R;
    return new b2Vec2(this.m_body1.m_position.x + (a.col1.x * this.m_localAnchor1.x + a.col2.x * this.m_localAnchor1.y), this.m_body1.m_position.y + (a.col1.y * this.m_localAnchor1.x + a.col2.y * this.m_localAnchor1.y))
},GetAnchor2:function() {
    var a = this.m_body2.m_R;
    return new b2Vec2(this.m_body2.m_position.x + (a.col1.x * this.m_localAnchor2.x + a.col2.x * this.m_localAnchor2.y), this.m_body2.m_position.y + (a.col1.y * this.m_localAnchor2.x + a.col2.y * this.m_localAnchor2.y))
},GetReactionForce:function(a) {
    return new b2Vec2()
},GetReactionTorque:function(a) {
    return 0
},GetRatio:function() {
    return this.m_ratio
},PrepareVelocitySolver:function() {
    var a = this.m_ground1;
    var l = this.m_ground2;
    var i = this.m_body1;
    var f = this.m_body2;
    var j;
    var g;
    var c;
    var b;
    var d;
    var k;
    var h;
    var e = 0;
    this.m_J.SetZero();
    if (this.m_revolute1) {
        this.m_J.angular1 = -1;
        e += i.m_invI
    } else {
        d = a.m_R;
        k = this.m_prismatic1.m_localXAxis1;
        j = d.col1.x * k.x + d.col2.x * k.y;
        g = d.col1.y * k.x + d.col2.y * k.y;
        d = i.m_R;
        c = d.col1.x * this.m_localAnchor1.x + d.col2.x * this.m_localAnchor1.y;
        b = d.col1.y * this.m_localAnchor1.x + d.col2.y * this.m_localAnchor1.y;
        h = c * g - b * j;
        this.m_J.linear1.Set(-j, -g);
        this.m_J.angular1 = -h;
        e += i.m_invMass + i.m_invI * h * h
    }
    if (this.m_revolute2) {
        this.m_J.angular2 = -this.m_ratio;
        e += this.m_ratio * this.m_ratio * f.m_invI
    } else {
        d = l.m_R;
        k = this.m_prismatic2.m_localXAxis1;
        j = d.col1.x * k.x + d.col2.x * k.y;
        g = d.col1.y * k.x + d.col2.y * k.y;
        d = f.m_R;
        c = d.col1.x * this.m_localAnchor2.x + d.col2.x * this.m_localAnchor2.y;
        b = d.col1.y * this.m_localAnchor2.x + d.col2.y * this.m_localAnchor2.y;
        h = c * g - b * j;
        this.m_J.linear2.Set(-this.m_ratio * j, -this.m_ratio * g);
        this.m_J.angular2 = -this.m_ratio * h;
        e += this.m_ratio * this.m_ratio * (f.m_invMass + f.m_invI * h * h)
    }
    this.m_mass = 1 / e;
    i.m_linearVelocity.x += i.m_invMass * this.m_impulse * this.m_J.linear1.x;
    i.m_linearVelocity.y += i.m_invMass * this.m_impulse * this.m_J.linear1.y;
    i.m_angularVelocity += i.m_invI * this.m_impulse * this.m_J.angular1;
    f.m_linearVelocity.x += f.m_invMass * this.m_impulse * this.m_J.linear2.x;
    f.m_linearVelocity.y += f.m_invMass * this.m_impulse * this.m_J.linear2.y;
    f.m_angularVelocity += f.m_invI * this.m_impulse * this.m_J.angular2
},SolveVelocityConstraints:function(c) {
    var b = this.m_body1;
    var a = this.m_body2;
    var e = this.m_J.Compute(b.m_linearVelocity, b.m_angularVelocity, a.m_linearVelocity, a.m_angularVelocity);
    var d = -this.m_mass * e;
    this.m_impulse += d;
    b.m_linearVelocity.x += b.m_invMass * d * this.m_J.linear1.x;
    b.m_linearVelocity.y += b.m_invMass * d * this.m_J.linear1.y;
    b.m_angularVelocity += b.m_invI * d * this.m_J.angular1;
    a.m_linearVelocity.x += a.m_invMass * d * this.m_J.linear2.x;
    a.m_linearVelocity.y += a.m_invMass * d * this.m_J.linear2.y;
    a.m_angularVelocity += a.m_invI * d * this.m_J.angular2
},SolvePositionConstraints:function() {
    var g = 0;
    var b = this.m_body1;
    var a = this.m_body2;
    var f;
    var d;
    if (this.m_revolute1) {
        f = this.m_revolute1.GetJointAngle()
    } else {
        f = this.m_prismatic1.GetJointTranslation()
    }
    if (this.m_revolute2) {
        d = this.m_revolute2.GetJointAngle()
    } else {
        d = this.m_prismatic2.GetJointTranslation()
    }
    var e = this.m_constant - (f + this.m_ratio * d);
    var c = -this.m_mass * e;
    b.m_position.x += b.m_invMass * c * this.m_J.linear1.x;
    b.m_position.y += b.m_invMass * c * this.m_J.linear1.y;
    b.m_rotation += b.m_invI * c * this.m_J.angular1;
    a.m_position.x += a.m_invMass * c * this.m_J.linear2.x;
    a.m_position.y += a.m_invMass * c * this.m_J.linear2.y;
    a.m_rotation += a.m_invI * c * this.m_J.angular2;
    b.m_R.Set(b.m_rotation);
    a.m_R.Set(a.m_rotation);
    return g < b2Settings.b2_linearSlop
},m_ground1:null,m_ground2:null,m_revolute1:null,m_prismatic1:null,m_revolute2:null,m_prismatic2:null,m_groundAnchor1:new b2Vec2(),m_groundAnchor2:new b2Vec2(),m_localAnchor1:new b2Vec2(),m_localAnchor2:new b2Vec2(),m_J:new b2Jacobian(),m_constant:null,m_ratio:null,m_mass:null,m_impulse:null});
var b2GearJointDef = function() {
    this.type = b2Joint.e_gearJoint;
    this.joint1 = null;
    this.joint2 = null;
    this.ratio = 1
};
Object.extend(b2GearJointDef.prototype, b2JointDef.prototype);
Object.extend(b2GearJointDef.prototype, {joint1:null,joint2:null,ratio:null});
var b2MouseJoint = function(e) {
    this.m_node1 = new b2JointNode();
    this.m_node2 = new b2JointNode();
    this.m_type = e.type;
    this.m_prev = null;
    this.m_next = null;
    this.m_body1 = e.body1;
    this.m_body2 = e.body2;
    this.m_collideConnected = e.collideConnected;
    this.m_islandFlag = false;
    this.m_userData = e.userData;
    this.K = new b2Mat22();
    this.K1 = new b2Mat22();
    this.K2 = new b2Mat22();
    this.m_localAnchor = new b2Vec2();
    this.m_target = new b2Vec2();
    this.m_impulse = new b2Vec2();
    this.m_ptpMass = new b2Mat22();
    this.m_C = new b2Vec2();
    this.m_target.SetV(e.target);
    var a = this.m_target.x - this.m_body2.m_position.x;
    var h = this.m_target.y - this.m_body2.m_position.y;
    this.m_localAnchor.x = (a * this.m_body2.m_R.col1.x + h * this.m_body2.m_R.col1.y);
    this.m_localAnchor.y = (a * this.m_body2.m_R.col2.x + h * this.m_body2.m_R.col2.y);
    this.m_maxForce = e.maxForce;
    this.m_impulse.SetZero();
    var c = this.m_body2.m_mass;
    var g = 2 * b2Settings.b2_pi * e.frequencyHz;
    var f = 2 * c * e.dampingRatio * g;
    var b = c * g * g;
    this.m_gamma = 1 / (f + e.timeStep * b);
    this.m_beta = e.timeStep * b / (f + e.timeStep * b)
};
Object.extend(b2MouseJoint.prototype, b2Joint.prototype);
Object.extend(b2MouseJoint.prototype, {GetAnchor1:function() {
    return this.m_target
},GetAnchor2:function() {
    var a = b2Math.b2MulMV(this.m_body2.m_R, this.m_localAnchor);
    a.Add(this.m_body2.m_position);
    return a
},GetReactionForce:function(a) {
    var b = new b2Vec2();
    b.SetV(this.m_impulse);
    b.Multiply(a);
    return b
},GetReactionTorque:function(a) {
    return 0
},SetTarget:function(a) {
    this.m_body2.WakeUp();
    this.m_target = a
},K:new b2Mat22(),K1:new b2Mat22(),K2:new b2Mat22(),PrepareVelocitySolver:function() {
    var a = this.m_body2;
    var e;
    e = a.m_R;
    var i = e.col1.x * this.m_localAnchor.x + e.col2.x * this.m_localAnchor.y;
    var h = e.col1.y * this.m_localAnchor.x + e.col2.y * this.m_localAnchor.y;
    var g = a.m_invMass;
    var c = a.m_invI;
    this.K1.col1.x = g;
    this.K1.col2.x = 0;
    this.K1.col1.y = 0;
    this.K1.col2.y = g;
    this.K2.col1.x = c * h * h;
    this.K2.col2.x = -c * i * h;
    this.K2.col1.y = -c * i * h;
    this.K2.col2.y = c * i * i;
    this.K.SetM(this.K1);
    this.K.AddM(this.K2);
    this.K.col1.x += this.m_gamma;
    this.K.col2.y += this.m_gamma;
    this.K.Invert(this.m_ptpMass);
    this.m_C.x = a.m_position.x + i - this.m_target.x;
    this.m_C.y = a.m_position.y + h - this.m_target.y;
    a.m_angularVelocity *= 0.98;
    var f = this.m_impulse.x;
    var d = this.m_impulse.y;
    a.m_linearVelocity.x += g * f;
    a.m_linearVelocity.y += g * d;
    a.m_angularVelocity += c * (i * d - h * f)
},SolveVelocityConstraints:function(d) {
    var i = this.m_body2;
    var k;
    k = i.m_R;
    var h = k.col1.x * this.m_localAnchor.x + k.col2.x * this.m_localAnchor.y;
    var f = k.col1.y * this.m_localAnchor.x + k.col2.y * this.m_localAnchor.y;
    var a = i.m_linearVelocity.x + (-i.m_angularVelocity * f);
    var n = i.m_linearVelocity.y + (i.m_angularVelocity * h);
    k = this.m_ptpMass;
    var m = a + (this.m_beta * d.inv_dt) * this.m_C.x + this.m_gamma * this.m_impulse.x;
    var l = n + (this.m_beta * d.inv_dt) * this.m_C.y + this.m_gamma * this.m_impulse.y;
    var e = -(k.col1.x * m + k.col2.x * l);
    var c = -(k.col1.y * m + k.col2.y * l);
    var j = this.m_impulse.x;
    var g = this.m_impulse.y;
    this.m_impulse.x += e;
    this.m_impulse.y += c;
    var b = this.m_impulse.Length();
    if (b > d.dt * this.m_maxForce) {
        this.m_impulse.Multiply(d.dt * this.m_maxForce / b)
    }
    e = this.m_impulse.x - j;
    c = this.m_impulse.y - g;
    i.m_linearVelocity.x += i.m_invMass * e;
    i.m_linearVelocity.y += i.m_invMass * c;
    i.m_angularVelocity += i.m_invI * (h * c - f * e)
},SolvePositionConstraints:function() {
    return true
},m_localAnchor:new b2Vec2(),m_target:new b2Vec2(),m_impulse:new b2Vec2(),m_ptpMass:new b2Mat22(),m_C:new b2Vec2(),m_maxForce:null,m_beta:null,m_gamma:null});
var b2MouseJointDef = function() {
    this.type = b2Joint.e_mouseJoint;
    this.userData = null;
    this.body1 = null;
    this.body2 = null;
    this.collideConnected = false;
    this.target = new b2Vec2();
    this.type = b2Joint.e_mouseJoint;
    this.maxForce = 0;
    this.frequencyHz = 5;
    this.dampingRatio = 0.7;
    this.timeStep = 1 / 60
};
Object.extend(b2MouseJointDef.prototype, b2JointDef.prototype);
Object.extend(b2MouseJointDef.prototype, {target:new b2Vec2(),maxForce:null,frequencyHz:null,dampingRatio:null,timeStep:null});
var b2PrismaticJoint = function(c) {
    this.m_node1 = new b2JointNode();
    this.m_node2 = new b2JointNode();
    this.m_type = c.type;
    this.m_prev = null;
    this.m_next = null;
    this.m_body1 = c.body1;
    this.m_body2 = c.body2;
    this.m_collideConnected = c.collideConnected;
    this.m_islandFlag = false;
    this.m_userData = c.userData;
    this.m_localAnchor1 = new b2Vec2();
    this.m_localAnchor2 = new b2Vec2();
    this.m_localXAxis1 = new b2Vec2();
    this.m_localYAxis1 = new b2Vec2();
    this.m_linearJacobian = new b2Jacobian();
    this.m_motorJacobian = new b2Jacobian();
    var b;
    var a;
    var d;
    b = this.m_body1.m_R;
    a = (c.anchorPoint.x - this.m_body1.m_position.x);
    d = (c.anchorPoint.y - this.m_body1.m_position.y);
    this.m_localAnchor1.Set((a * b.col1.x + d * b.col1.y), (a * b.col2.x + d * b.col2.y));
    b = this.m_body2.m_R;
    a = (c.anchorPoint.x - this.m_body2.m_position.x);
    d = (c.anchorPoint.y - this.m_body2.m_position.y);
    this.m_localAnchor2.Set((a * b.col1.x + d * b.col1.y), (a * b.col2.x + d * b.col2.y));
    b = this.m_body1.m_R;
    a = c.axis.x;
    d = c.axis.y;
    this.m_localXAxis1.Set((a * b.col1.x + d * b.col1.y), (a * b.col2.x + d * b.col2.y));
    this.m_localYAxis1.x = -this.m_localXAxis1.y;
    this.m_localYAxis1.y = this.m_localXAxis1.x;
    this.m_initialAngle = this.m_body2.m_rotation - this.m_body1.m_rotation;
    this.m_linearJacobian.SetZero();
    this.m_linearMass = 0;
    this.m_linearImpulse = 0;
    this.m_angularMass = 0;
    this.m_angularImpulse = 0;
    this.m_motorJacobian.SetZero();
    this.m_motorMass = 0;
    this.m_motorImpulse = 0;
    this.m_limitImpulse = 0;
    this.m_limitPositionImpulse = 0;
    this.m_lowerTranslation = c.lowerTranslation;
    this.m_upperTranslation = c.upperTranslation;
    this.m_maxMotorForce = c.motorForce;
    this.m_motorSpeed = c.motorSpeed;
    this.m_enableLimit = c.enableLimit;
    this.m_enableMotor = c.enableMotor
};
Object.extend(b2PrismaticJoint.prototype, b2Joint.prototype);
Object.extend(b2PrismaticJoint.prototype, {GetAnchor1:function() {
    var a = this.m_body1;
    var b = new b2Vec2();
    b.SetV(this.m_localAnchor1);
    b.MulM(a.m_R);
    b.Add(a.m_position);
    return b
},GetAnchor2:function() {
    var a = this.m_body2;
    var b = new b2Vec2();
    b.SetV(this.m_localAnchor2);
    b.MulM(a.m_R);
    b.Add(a.m_position);
    return b
},GetJointTranslation:function() {
    var l = this.m_body1;
    var k = this.m_body2;
    var j;
    j = l.m_R;
    var p = j.col1.x * this.m_localAnchor1.x + j.col2.x * this.m_localAnchor1.y;
    var n = j.col1.y * this.m_localAnchor1.x + j.col2.y * this.m_localAnchor1.y;
    j = k.m_R;
    var i = j.col1.x * this.m_localAnchor2.x + j.col2.x * this.m_localAnchor2.y;
    var h = j.col1.y * this.m_localAnchor2.x + j.col2.y * this.m_localAnchor2.y;
    var g = l.m_position.x + p;
    var f = l.m_position.y + n;
    var c = k.m_position.x + i;
    var b = k.m_position.y + h;
    var e = c - g;
    var d = b - f;
    j = l.m_R;
    var o = j.col1.x * this.m_localXAxis1.x + j.col2.x * this.m_localXAxis1.y;
    var m = j.col1.y * this.m_localXAxis1.x + j.col2.y * this.m_localXAxis1.y;
    var a = o * e + m * d;
    return a
},GetJointSpeed:function() {
    var j = this.m_body1;
    var i = this.m_body2;
    var k;
    k = j.m_R;
    var t = k.col1.x * this.m_localAnchor1.x + k.col2.x * this.m_localAnchor1.y;
    var s = k.col1.y * this.m_localAnchor1.x + k.col2.y * this.m_localAnchor1.y;
    k = i.m_R;
    var h = k.col1.x * this.m_localAnchor2.x + k.col2.x * this.m_localAnchor2.y;
    var g = k.col1.y * this.m_localAnchor2.x + k.col2.y * this.m_localAnchor2.y;
    var r = j.m_position.x + t;
    var p = j.m_position.y + s;
    var c = i.m_position.x + h;
    var a = i.m_position.y + g;
    var f = c - r;
    var e = a - p;
    k = j.m_R;
    var o = k.col1.x * this.m_localXAxis1.x + k.col2.x * this.m_localXAxis1.y;
    var n = k.col1.y * this.m_localXAxis1.x + k.col2.y * this.m_localXAxis1.y;
    var d = j.m_linearVelocity;
    var b = i.m_linearVelocity;
    var m = j.m_angularVelocity;
    var l = i.m_angularVelocity;
    var q = (f * (-m * n) + e * (m * o)) + (o * (((b.x + (-l * g)) - d.x) - (-m * s)) + n * (((b.y + (l * h)) - d.y) - (m * t)));
    return q
},GetMotorForce:function(a) {
    return a * this.m_motorImpulse
},SetMotorSpeed:function(a) {
    this.m_motorSpeed = a
},SetMotorForce:function(a) {
    this.m_maxMotorForce = a
},GetReactionForce:function(b) {
    var e = b * this.m_limitImpulse;
    var d;
    d = this.m_body1.m_R;
    var g = e * (d.col1.x * this.m_localXAxis1.x + d.col2.x * this.m_localXAxis1.y);
    var f = e * (d.col1.y * this.m_localXAxis1.x + d.col2.y * this.m_localXAxis1.y);
    var c = e * (d.col1.x * this.m_localYAxis1.x + d.col2.x * this.m_localYAxis1.y);
    var a = e * (d.col1.y * this.m_localYAxis1.x + d.col2.y * this.m_localYAxis1.y);
    return new b2Vec2(g + c, f + a)
},GetReactionTorque:function(a) {
    return a * this.m_angularImpulse
},PrepareVelocitySolver:function() {
    var m = this.m_body1;
    var l = this.m_body2;
    var p;
    p = m.m_R;
    var z = p.col1.x * this.m_localAnchor1.x + p.col2.x * this.m_localAnchor1.y;
    var y = p.col1.y * this.m_localAnchor1.x + p.col2.y * this.m_localAnchor1.y;
    p = l.m_R;
    var i = p.col1.x * this.m_localAnchor2.x + p.col2.x * this.m_localAnchor2.y;
    var g = p.col1.y * this.m_localAnchor2.x + p.col2.y * this.m_localAnchor2.y;
    var s = m.m_invMass;
    var r = l.m_invMass;
    var k = m.m_invI;
    var j = l.m_invI;
    p = m.m_R;
    var h = p.col1.x * this.m_localYAxis1.x + p.col2.x * this.m_localYAxis1.y;
    var f = p.col1.y * this.m_localYAxis1.x + p.col2.y * this.m_localYAxis1.y;
    var t = l.m_position.x + i - m.m_position.x;
    var q = l.m_position.y + g - m.m_position.y;
    this.m_linearJacobian.linear1.x = -h;
    this.m_linearJacobian.linear1.y = -f;
    this.m_linearJacobian.linear2.x = h;
    this.m_linearJacobian.linear2.y = f;
    this.m_linearJacobian.angular1 = -(t * f - q * h);
    this.m_linearJacobian.angular2 = i * f - g * h;
    this.m_linearMass = s + k * this.m_linearJacobian.angular1 * this.m_linearJacobian.angular1 + r + j * this.m_linearJacobian.angular2 * this.m_linearJacobian.angular2;
    this.m_linearMass = 1 / this.m_linearMass;
    this.m_angularMass = 1 / (k + j);
    if (this.m_enableLimit || this.m_enableMotor) {
        p = m.m_R;
        var v = p.col1.x * this.m_localXAxis1.x + p.col2.x * this.m_localXAxis1.y;
        var u = p.col1.y * this.m_localXAxis1.x + p.col2.y * this.m_localXAxis1.y;
        this.m_motorJacobian.linear1.x = -v;
        this.m_motorJacobian.linear1.y = -u;
        this.m_motorJacobian.linear2.x = v;
        this.m_motorJacobian.linear2.y = u;
        this.m_motorJacobian.angular1 = -(t * u - q * v);
        this.m_motorJacobian.angular2 = i * u - g * v;
        this.m_motorMass = s + k * this.m_motorJacobian.angular1 * this.m_motorJacobian.angular1 + r + j * this.m_motorJacobian.angular2 * this.m_motorJacobian.angular2;
        this.m_motorMass = 1 / this.m_motorMass;
        if (this.m_enableLimit) {
            var e = t - z;
            var d = q - y;
            var c = v * e + u * d;
            if (b2Math.b2Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2 * b2Settings.b2_linearSlop) {
                this.m_limitState = b2Joint.e_equalLimits
            } else {
                if (c <= this.m_lowerTranslation) {
                    if (this.m_limitState != b2Joint.e_atLowerLimit) {
                        this.m_limitImpulse = 0
                    }
                    this.m_limitState = b2Joint.e_atLowerLimit
                } else {
                    if (c >= this.m_upperTranslation) {
                        if (this.m_limitState != b2Joint.e_atUpperLimit) {
                            this.m_limitImpulse = 0
                        }
                        this.m_limitState = b2Joint.e_atUpperLimit
                    } else {
                        this.m_limitState = b2Joint.e_inactiveLimit;
                        this.m_limitImpulse = 0
                    }
                }
            }
        }
    }
    if (this.m_enableMotor == false) {
        this.m_motorImpulse = 0
    }
    if (this.m_enableLimit == false) {
        this.m_limitImpulse = 0
    }
    if (b2World.s_enableWarmStarting) {
        var b = this.m_linearImpulse * this.m_linearJacobian.linear1.x + (this.m_motorImpulse + this.m_limitImpulse) * this.m_motorJacobian.linear1.x;
        var a = this.m_linearImpulse * this.m_linearJacobian.linear1.y + (this.m_motorImpulse + this.m_limitImpulse) * this.m_motorJacobian.linear1.y;
        var o = this.m_linearImpulse * this.m_linearJacobian.linear2.x + (this.m_motorImpulse + this.m_limitImpulse) * this.m_motorJacobian.linear2.x;
        var n = this.m_linearImpulse * this.m_linearJacobian.linear2.y + (this.m_motorImpulse + this.m_limitImpulse) * this.m_motorJacobian.linear2.y;
        var x = this.m_linearImpulse * this.m_linearJacobian.angular1 - this.m_angularImpulse + (this.m_motorImpulse + this.m_limitImpulse) * this.m_motorJacobian.angular1;
        var w = this.m_linearImpulse * this.m_linearJacobian.angular2 + this.m_angularImpulse + (this.m_motorImpulse + this.m_limitImpulse) * this.m_motorJacobian.angular2;
        m.m_linearVelocity.x += s * b;
        m.m_linearVelocity.y += s * a;
        m.m_angularVelocity += k * x;
        l.m_linearVelocity.x += r * o;
        l.m_linearVelocity.y += r * n;
        l.m_angularVelocity += j * w
    } else {
        this.m_linearImpulse = 0;
        this.m_angularImpulse = 0;
        this.m_limitImpulse = 0;
        this.m_motorImpulse = 0
    }
    this.m_limitPositionImpulse = 0
},SolveVelocityConstraints:function(b) {
    var l = this.m_body1;
    var k = this.m_body2;
    var q = l.m_invMass;
    var o = k.m_invMass;
    var d = l.m_invI;
    var c = k.m_invI;
    var p;
    var e = this.m_linearJacobian.Compute(l.m_linearVelocity, l.m_angularVelocity, k.m_linearVelocity, k.m_angularVelocity);
    var j = -this.m_linearMass * e;
    this.m_linearImpulse += j;
    l.m_linearVelocity.x += (q * j) * this.m_linearJacobian.linear1.x;
    l.m_linearVelocity.y += (q * j) * this.m_linearJacobian.linear1.y;
    l.m_angularVelocity += d * j * this.m_linearJacobian.angular1;
    k.m_linearVelocity.x += (o * j) * this.m_linearJacobian.linear2.x;
    k.m_linearVelocity.y += (o * j) * this.m_linearJacobian.linear2.y;
    k.m_angularVelocity += c * j * this.m_linearJacobian.angular2;
    var h = k.m_angularVelocity - l.m_angularVelocity;
    var a = -this.m_angularMass * h;
    this.m_angularImpulse += a;
    l.m_angularVelocity -= d * a;
    k.m_angularVelocity += c * a;
    if (this.m_enableMotor && this.m_limitState != b2Joint.e_equalLimits) {
        var m = this.m_motorJacobian.Compute(l.m_linearVelocity, l.m_angularVelocity, k.m_linearVelocity, k.m_angularVelocity) - this.m_motorSpeed;
        var f = -this.m_motorMass * m;
        var n = this.m_motorImpulse;
        this.m_motorImpulse = b2Math.b2Clamp(this.m_motorImpulse + f, -b.dt * this.m_maxMotorForce, b.dt * this.m_maxMotorForce);
        f = this.m_motorImpulse - n;
        l.m_linearVelocity.x += (q * f) * this.m_motorJacobian.linear1.x;
        l.m_linearVelocity.y += (q * f) * this.m_motorJacobian.linear1.y;
        l.m_angularVelocity += d * f * this.m_motorJacobian.angular1;
        k.m_linearVelocity.x += (o * f) * this.m_motorJacobian.linear2.x;
        k.m_linearVelocity.y += (o * f) * this.m_motorJacobian.linear2.y;
        k.m_angularVelocity += c * f * this.m_motorJacobian.angular2
    }
    if (this.m_enableLimit && this.m_limitState != b2Joint.e_inactiveLimit) {
        var i = this.m_motorJacobian.Compute(l.m_linearVelocity, l.m_angularVelocity, k.m_linearVelocity, k.m_angularVelocity);
        var g = -this.m_motorMass * i;
        if (this.m_limitState == b2Joint.e_equalLimits) {
            this.m_limitImpulse += g
        } else {
            if (this.m_limitState == b2Joint.e_atLowerLimit) {
                p = this.m_limitImpulse;
                this.m_limitImpulse = b2Math.b2Max(this.m_limitImpulse + g, 0);
                g = this.m_limitImpulse - p
            } else {
                if (this.m_limitState == b2Joint.e_atUpperLimit) {
                    p = this.m_limitImpulse;
                    this.m_limitImpulse = b2Math.b2Min(this.m_limitImpulse + g, 0);
                    g = this.m_limitImpulse - p
                }
            }
        }
        l.m_linearVelocity.x += (q * g) * this.m_motorJacobian.linear1.x;
        l.m_linearVelocity.y += (q * g) * this.m_motorJacobian.linear1.y;
        l.m_angularVelocity += d * g * this.m_motorJacobian.angular1;
        k.m_linearVelocity.x += (o * g) * this.m_motorJacobian.linear2.x;
        k.m_linearVelocity.y += (o * g) * this.m_motorJacobian.linear2.y;
        k.m_angularVelocity += c * g * this.m_motorJacobian.angular2
    }
},SolvePositionConstraints:function() {
    var o;
    var y;
    var m = this.m_body1;
    var k = this.m_body2;
    var t = m.m_invMass;
    var s = k.m_invMass;
    var j = m.m_invI;
    var i = k.m_invI;
    var q;
    q = m.m_R;
    var E = q.col1.x * this.m_localAnchor1.x + q.col2.x * this.m_localAnchor1.y;
    var D = q.col1.y * this.m_localAnchor1.x + q.col2.y * this.m_localAnchor1.y;
    q = k.m_R;
    var h = q.col1.x * this.m_localAnchor2.x + q.col2.x * this.m_localAnchor2.y;
    var g = q.col1.y * this.m_localAnchor2.x + q.col2.y * this.m_localAnchor2.y;
    var B = m.m_position.x + E;
    var z = m.m_position.y + D;
    var b = k.m_position.x + h;
    var a = k.m_position.y + g;
    var e = b - B;
    var c = a - z;
    q = m.m_R;
    var f = q.col1.x * this.m_localYAxis1.x + q.col2.x * this.m_localYAxis1.y;
    var d = q.col1.y * this.m_localYAxis1.x + q.col2.y * this.m_localYAxis1.y;
    var l = f * e + d * c;
    l = b2Math.b2Clamp(l, -b2Settings.b2_maxLinearCorrection, b2Settings.b2_maxLinearCorrection);
    var x = -this.m_linearMass * l;
    m.m_position.x += (t * x) * this.m_linearJacobian.linear1.x;
    m.m_position.y += (t * x) * this.m_linearJacobian.linear1.y;
    m.m_rotation += j * x * this.m_linearJacobian.angular1;
    k.m_position.x += (s * x) * this.m_linearJacobian.linear2.x;
    k.m_position.y += (s * x) * this.m_linearJacobian.linear2.y;
    k.m_rotation += i * x * this.m_linearJacobian.angular2;
    var p = b2Math.b2Abs(l);
    var A = k.m_rotation - m.m_rotation - this.m_initialAngle;
    A = b2Math.b2Clamp(A, -b2Settings.b2_maxAngularCorrection, b2Settings.b2_maxAngularCorrection);
    var r = -this.m_angularMass * A;
    m.m_rotation -= m.m_invI * r;
    m.m_R.Set(m.m_rotation);
    k.m_rotation += k.m_invI * r;
    k.m_R.Set(k.m_rotation);
    var C = b2Math.b2Abs(A);
    if (this.m_enableLimit && this.m_limitState != b2Joint.e_inactiveLimit) {
        q = m.m_R;
        E = q.col1.x * this.m_localAnchor1.x + q.col2.x * this.m_localAnchor1.y;
        D = q.col1.y * this.m_localAnchor1.x + q.col2.y * this.m_localAnchor1.y;
        q = k.m_R;
        h = q.col1.x * this.m_localAnchor2.x + q.col2.x * this.m_localAnchor2.y;
        g = q.col1.y * this.m_localAnchor2.x + q.col2.y * this.m_localAnchor2.y;
        B = m.m_position.x + E;
        z = m.m_position.y + D;
        b = k.m_position.x + h;
        a = k.m_position.y + g;
        e = b - B;
        c = a - z;
        q = m.m_R;
        var v = q.col1.x * this.m_localXAxis1.x + q.col2.x * this.m_localXAxis1.y;
        var u = q.col1.y * this.m_localXAxis1.x + q.col2.y * this.m_localXAxis1.y;
        var n = (v * e + u * c);
        var w = 0;
        if (this.m_limitState == b2Joint.e_equalLimits) {
            o = b2Math.b2Clamp(n, -b2Settings.b2_maxLinearCorrection, b2Settings.b2_maxLinearCorrection);
            w = -this.m_motorMass * o;
            p = b2Math.b2Max(p, b2Math.b2Abs(A))
        } else {
            if (this.m_limitState == b2Joint.e_atLowerLimit) {
                o = n - this.m_lowerTranslation;
                p = b2Math.b2Max(p, -o);
                o = b2Math.b2Clamp(o + b2Settings.b2_linearSlop, -b2Settings.b2_maxLinearCorrection, 0);
                w = -this.m_motorMass * o;
                y = this.m_limitPositionImpulse;
                this.m_limitPositionImpulse = b2Math.b2Max(this.m_limitPositionImpulse + w, 0);
                w = this.m_limitPositionImpulse - y
            } else {
                if (this.m_limitState == b2Joint.e_atUpperLimit) {
                    o = n - this.m_upperTranslation;
                    p = b2Math.b2Max(p, o);
                    o = b2Math.b2Clamp(o - b2Settings.b2_linearSlop, 0, b2Settings.b2_maxLinearCorrection);
                    w = -this.m_motorMass * o;
                    y = this.m_limitPositionImpulse;
                    this.m_limitPositionImpulse = b2Math.b2Min(this.m_limitPositionImpulse + w, 0);
                    w = this.m_limitPositionImpulse - y
                }
            }
        }
        m.m_position.x += (t * w) * this.m_motorJacobian.linear1.x;
        m.m_position.y += (t * w) * this.m_motorJacobian.linear1.y;
        m.m_rotation += j * w * this.m_motorJacobian.angular1;
        m.m_R.Set(m.m_rotation);
        k.m_position.x += (s * w) * this.m_motorJacobian.linear2.x;
        k.m_position.y += (s * w) * this.m_motorJacobian.linear2.y;
        k.m_rotation += i * w * this.m_motorJacobian.angular2;
        k.m_R.Set(k.m_rotation)
    }
    return p <= b2Settings.b2_linearSlop && C <= b2Settings.b2_angularSlop
},m_localAnchor1:new b2Vec2(),m_localAnchor2:new b2Vec2(),m_localXAxis1:new b2Vec2(),m_localYAxis1:new b2Vec2(),m_initialAngle:null,m_linearJacobian:new b2Jacobian(),m_linearMass:null,m_linearImpulse:null,m_angularMass:null,m_angularImpulse:null,m_motorJacobian:new b2Jacobian(),m_motorMass:null,m_motorImpulse:null,m_limitImpulse:null,m_limitPositionImpulse:null,m_lowerTranslation:null,m_upperTranslation:null,m_maxMotorForce:null,m_motorSpeed:null,m_enableLimit:null,m_enableMotor:null,m_limitState:0});
var b2PrismaticJointDef = function() {
    this.type = b2Joint.e_unknownJoint;
    this.userData = null;
    this.body1 = null;
    this.body2 = null;
    this.collideConnected = false;
    this.type = b2Joint.e_prismaticJoint;
    this.anchorPoint = new b2Vec2(0, 0);
    this.axis = new b2Vec2(0, 0);
    this.lowerTranslation = 0;
    this.upperTranslation = 0;
    this.motorForce = 0;
    this.motorSpeed = 0;
    this.enableLimit = false;
    this.enableMotor = false
};
Object.extend(b2PrismaticJointDef.prototype, b2JointDef.prototype);
Object.extend(b2PrismaticJointDef.prototype, {anchorPoint:null,axis:null,lowerTranslation:null,upperTranslation:null,motorForce:null,motorSpeed:null,enableLimit:null,enableMotor:null});
var b2PulleyJoint = function(d) {
    this.m_node1 = new b2JointNode();
    this.m_node2 = new b2JointNode();
    this.m_type = d.type;
    this.m_prev = null;
    this.m_next = null;
    this.m_body1 = d.body1;
    this.m_body2 = d.body2;
    this.m_collideConnected = d.collideConnected;
    this.m_islandFlag = false;
    this.m_userData = d.userData;
    this.m_groundAnchor1 = new b2Vec2();
    this.m_groundAnchor2 = new b2Vec2();
    this.m_localAnchor1 = new b2Vec2();
    this.m_localAnchor2 = new b2Vec2();
    this.m_u1 = new b2Vec2();
    this.m_u2 = new b2Vec2();
    var b;
    var a;
    var h;
    this.m_ground = this.m_body1.m_world.m_groundBody;
    this.m_groundAnchor1.x = d.groundPoint1.x - this.m_ground.m_position.x;
    this.m_groundAnchor1.y = d.groundPoint1.y - this.m_ground.m_position.y;
    this.m_groundAnchor2.x = d.groundPoint2.x - this.m_ground.m_position.x;
    this.m_groundAnchor2.y = d.groundPoint2.y - this.m_ground.m_position.y;
    b = this.m_body1.m_R;
    a = d.anchorPoint1.x - this.m_body1.m_position.x;
    h = d.anchorPoint1.y - this.m_body1.m_position.y;
    this.m_localAnchor1.x = a * b.col1.x + h * b.col1.y;
    this.m_localAnchor1.y = a * b.col2.x + h * b.col2.y;
    b = this.m_body2.m_R;
    a = d.anchorPoint2.x - this.m_body2.m_position.x;
    h = d.anchorPoint2.y - this.m_body2.m_position.y;
    this.m_localAnchor2.x = a * b.col1.x + h * b.col1.y;
    this.m_localAnchor2.y = a * b.col2.x + h * b.col2.y;
    this.m_ratio = d.ratio;
    a = d.groundPoint1.x - d.anchorPoint1.x;
    h = d.groundPoint1.y - d.anchorPoint1.y;
    var f = Math.sqrt(a * a + h * h);
    a = d.groundPoint2.x - d.anchorPoint2.x;
    h = d.groundPoint2.y - d.anchorPoint2.y;
    var c = Math.sqrt(a * a + h * h);
    var g = b2Math.b2Max(0.5 * b2PulleyJoint.b2_minPulleyLength, f);
    var e = b2Math.b2Max(0.5 * b2PulleyJoint.b2_minPulleyLength, c);
    this.m_constant = g + this.m_ratio * e;
    this.m_maxLength1 = b2Math.b2Clamp(d.maxLength1, g, this.m_constant - this.m_ratio * b2PulleyJoint.b2_minPulleyLength);
    this.m_maxLength2 = b2Math.b2Clamp(d.maxLength2, e, (this.m_constant - b2PulleyJoint.b2_minPulleyLength) / this.m_ratio);
    this.m_pulleyImpulse = 0;
    this.m_limitImpulse1 = 0;
    this.m_limitImpulse2 = 0
};
Object.extend(b2PulleyJoint.prototype, b2Joint.prototype);
Object.extend(b2PulleyJoint.prototype, {GetAnchor1:function() {
    var a = this.m_body1.m_R;
    return new b2Vec2(this.m_body1.m_position.x + (a.col1.x * this.m_localAnchor1.x + a.col2.x * this.m_localAnchor1.y), this.m_body1.m_position.y + (a.col1.y * this.m_localAnchor1.x + a.col2.y * this.m_localAnchor1.y))
},GetAnchor2:function() {
    var a = this.m_body2.m_R;
    return new b2Vec2(this.m_body2.m_position.x + (a.col1.x * this.m_localAnchor2.x + a.col2.x * this.m_localAnchor2.y), this.m_body2.m_position.y + (a.col1.y * this.m_localAnchor2.x + a.col2.y * this.m_localAnchor2.y))
},GetGroundPoint1:function() {
    return new b2Vec2(this.m_ground.m_position.x + this.m_groundAnchor1.x, this.m_ground.m_position.y + this.m_groundAnchor1.y)
},GetGroundPoint2:function() {
    return new b2Vec2(this.m_ground.m_position.x + this.m_groundAnchor2.x, this.m_ground.m_position.y + this.m_groundAnchor2.y)
},GetReactionForce:function(a) {
    return new b2Vec2()
},GetReactionTorque:function(a) {
    return 0
},GetLength1:function() {
    var e;
    e = this.m_body1.m_R;
    var d = this.m_body1.m_position.x + (e.col1.x * this.m_localAnchor1.x + e.col2.x * this.m_localAnchor1.y);
    var c = this.m_body1.m_position.y + (e.col1.y * this.m_localAnchor1.x + e.col2.y * this.m_localAnchor1.y);
    var b = d - (this.m_ground.m_position.x + this.m_groundAnchor1.x);
    var a = c - (this.m_ground.m_position.y + this.m_groundAnchor1.y);
    return Math.sqrt(b * b + a * a)
},GetLength2:function() {
    var e;
    e = this.m_body2.m_R;
    var d = this.m_body2.m_position.x + (e.col1.x * this.m_localAnchor2.x + e.col2.x * this.m_localAnchor2.y);
    var c = this.m_body2.m_position.y + (e.col1.y * this.m_localAnchor2.x + e.col2.y * this.m_localAnchor2.y);
    var b = d - (this.m_ground.m_position.x + this.m_groundAnchor2.x);
    var a = c - (this.m_ground.m_position.y + this.m_groundAnchor2.y);
    return Math.sqrt(b * b + a * a)
},GetRatio:function() {
    return this.m_ratio
},PrepareVelocitySolver:function() {
    var h = this.m_body1;
    var g = this.m_body2;
    var l;
    l = h.m_R;
    var v = l.col1.x * this.m_localAnchor1.x + l.col2.x * this.m_localAnchor1.y;
    var u = l.col1.y * this.m_localAnchor1.x + l.col2.y * this.m_localAnchor1.y;
    l = g.m_R;
    var f = l.col1.x * this.m_localAnchor2.x + l.col2.x * this.m_localAnchor2.y;
    var e = l.col1.y * this.m_localAnchor2.x + l.col2.y * this.m_localAnchor2.y;
    var t = h.m_position.x + v;
    var r = h.m_position.y + u;
    var d = g.m_position.x + f;
    var c = g.m_position.y + e;
    var m = this.m_ground.m_position.x + this.m_groundAnchor1.x;
    var k = this.m_ground.m_position.y + this.m_groundAnchor1.y;
    var s = this.m_ground.m_position.x + this.m_groundAnchor2.x;
    var q = this.m_ground.m_position.y + this.m_groundAnchor2.y;
    this.m_u1.Set(t - m, r - k);
    this.m_u2.Set(d - s, c - q);
    var p = this.m_u1.Length();
    var o = this.m_u2.Length();
    if (p > b2Settings.b2_linearSlop) {
        this.m_u1.Multiply(1 / p)
    } else {
        this.m_u1.SetZero()
    }
    if (o > b2Settings.b2_linearSlop) {
        this.m_u2.Multiply(1 / o)
    } else {
        this.m_u2.SetZero()
    }
    if (p < this.m_maxLength1) {
        this.m_limitState1 = b2Joint.e_inactiveLimit;
        this.m_limitImpulse1 = 0
    } else {
        this.m_limitState1 = b2Joint.e_atUpperLimit;
        this.m_limitPositionImpulse1 = 0
    }
    if (o < this.m_maxLength2) {
        this.m_limitState2 = b2Joint.e_inactiveLimit;
        this.m_limitImpulse2 = 0
    } else {
        this.m_limitState2 = b2Joint.e_atUpperLimit;
        this.m_limitPositionImpulse2 = 0
    }
    var w = v * this.m_u1.y - u * this.m_u1.x;
    var n = f * this.m_u2.y - e * this.m_u2.x;
    this.m_limitMass1 = h.m_invMass + h.m_invI * w * w;
    this.m_limitMass2 = g.m_invMass + g.m_invI * n * n;
    this.m_pulleyMass = this.m_limitMass1 + this.m_ratio * this.m_ratio * this.m_limitMass2;
    this.m_limitMass1 = 1 / this.m_limitMass1;
    this.m_limitMass2 = 1 / this.m_limitMass2;
    this.m_pulleyMass = 1 / this.m_pulleyMass;
    var b = (-this.m_pulleyImpulse - this.m_limitImpulse1) * this.m_u1.x;
    var a = (-this.m_pulleyImpulse - this.m_limitImpulse1) * this.m_u1.y;
    var j = (-this.m_ratio * this.m_pulleyImpulse - this.m_limitImpulse2) * this.m_u2.x;
    var i = (-this.m_ratio * this.m_pulleyImpulse - this.m_limitImpulse2) * this.m_u2.y;
    h.m_linearVelocity.x += h.m_invMass * b;
    h.m_linearVelocity.y += h.m_invMass * a;
    h.m_angularVelocity += h.m_invI * (v * a - u * b);
    g.m_linearVelocity.x += g.m_invMass * j;
    g.m_linearVelocity.y += g.m_invMass * i;
    g.m_angularVelocity += g.m_invI * (f * i - e * j)
},SolveVelocityConstraints:function(h) {
    var i = this.m_body1;
    var g = this.m_body2;
    var n;
    n = i.m_R;
    var s = n.col1.x * this.m_localAnchor1.x + n.col2.x * this.m_localAnchor1.y;
    var r = n.col1.y * this.m_localAnchor1.x + n.col2.y * this.m_localAnchor1.y;
    n = g.m_R;
    var f = n.col1.x * this.m_localAnchor2.x + n.col2.x * this.m_localAnchor2.y;
    var e = n.col1.y * this.m_localAnchor2.x + n.col2.y * this.m_localAnchor2.y;
    var d;
    var b;
    var o;
    var l;
    var c;
    var a;
    var m;
    var k;
    var p;
    var j;
    var q;
    d = i.m_linearVelocity.x + (-i.m_angularVelocity * r);
    b = i.m_linearVelocity.y + (i.m_angularVelocity * s);
    o = g.m_linearVelocity.x + (-g.m_angularVelocity * e);
    l = g.m_linearVelocity.y + (g.m_angularVelocity * f);
    p = -(this.m_u1.x * d + this.m_u1.y * b) - this.m_ratio * (this.m_u2.x * o + this.m_u2.y * l);
    j = -this.m_pulleyMass * p;
    this.m_pulleyImpulse += j;
    c = -j * this.m_u1.x;
    a = -j * this.m_u1.y;
    m = -this.m_ratio * j * this.m_u2.x;
    k = -this.m_ratio * j * this.m_u2.y;
    i.m_linearVelocity.x += i.m_invMass * c;
    i.m_linearVelocity.y += i.m_invMass * a;
    i.m_angularVelocity += i.m_invI * (s * a - r * c);
    g.m_linearVelocity.x += g.m_invMass * m;
    g.m_linearVelocity.y += g.m_invMass * k;
    g.m_angularVelocity += g.m_invI * (f * k - e * m);
    if (this.m_limitState1 == b2Joint.e_atUpperLimit) {
        d = i.m_linearVelocity.x + (-i.m_angularVelocity * r);
        b = i.m_linearVelocity.y + (i.m_angularVelocity * s);
        p = -(this.m_u1.x * d + this.m_u1.y * b);
        j = -this.m_limitMass1 * p;
        q = this.m_limitImpulse1;
        this.m_limitImpulse1 = b2Math.b2Max(0, this.m_limitImpulse1 + j);
        j = this.m_limitImpulse1 - q;
        c = -j * this.m_u1.x;
        a = -j * this.m_u1.y;
        i.m_linearVelocity.x += i.m_invMass * c;
        i.m_linearVelocity.y += i.m_invMass * a;
        i.m_angularVelocity += i.m_invI * (s * a - r * c)
    }
    if (this.m_limitState2 == b2Joint.e_atUpperLimit) {
        o = g.m_linearVelocity.x + (-g.m_angularVelocity * e);
        l = g.m_linearVelocity.y + (g.m_angularVelocity * f);
        p = -(this.m_u2.x * o + this.m_u2.y * l);
        j = -this.m_limitMass2 * p;
        q = this.m_limitImpulse2;
        this.m_limitImpulse2 = b2Math.b2Max(0, this.m_limitImpulse2 + j);
        j = this.m_limitImpulse2 - q;
        m = -j * this.m_u2.x;
        k = -j * this.m_u2.y;
        g.m_linearVelocity.x += g.m_invMass * m;
        g.m_linearVelocity.y += g.m_invMass * k;
        g.m_angularVelocity += g.m_invI * (f * k - e * m)
    }
},SolvePositionConstraints:function() {
    var g = this.m_body1;
    var f = this.m_body2;
    var j;
    var k = this.m_ground.m_position.x + this.m_groundAnchor1.x;
    var i = this.m_ground.m_position.y + this.m_groundAnchor1.y;
    var q = this.m_ground.m_position.x + this.m_groundAnchor2.x;
    var o = this.m_ground.m_position.y + this.m_groundAnchor2.y;
    var u;
    var t;
    var d;
    var c;
    var r;
    var p;
    var b;
    var a;
    var n;
    var m;
    var l;
    var h;
    var s;
    var e = 0;
    j = g.m_R;
    u = j.col1.x * this.m_localAnchor1.x + j.col2.x * this.m_localAnchor1.y;
    t = j.col1.y * this.m_localAnchor1.x + j.col2.y * this.m_localAnchor1.y;
    j = f.m_R;
    d = j.col1.x * this.m_localAnchor2.x + j.col2.x * this.m_localAnchor2.y;
    c = j.col1.y * this.m_localAnchor2.x + j.col2.y * this.m_localAnchor2.y;
    r = g.m_position.x + u;
    p = g.m_position.y + t;
    b = f.m_position.x + d;
    a = f.m_position.y + c;
    this.m_u1.Set(r - k, p - i);
    this.m_u2.Set(b - q, a - o);
    n = this.m_u1.Length();
    m = this.m_u2.Length();
    if (n > b2Settings.b2_linearSlop) {
        this.m_u1.Multiply(1 / n)
    } else {
        this.m_u1.SetZero()
    }
    if (m > b2Settings.b2_linearSlop) {
        this.m_u2.Multiply(1 / m)
    } else {
        this.m_u2.SetZero()
    }
    l = this.m_constant - n - this.m_ratio * m;
    e = b2Math.b2Max(e, Math.abs(l));
    l = b2Math.b2Clamp(l, -b2Settings.b2_maxLinearCorrection, b2Settings.b2_maxLinearCorrection);
    h = -this.m_pulleyMass * l;
    r = -h * this.m_u1.x;
    p = -h * this.m_u1.y;
    b = -this.m_ratio * h * this.m_u2.x;
    a = -this.m_ratio * h * this.m_u2.y;
    g.m_position.x += g.m_invMass * r;
    g.m_position.y += g.m_invMass * p;
    g.m_rotation += g.m_invI * (u * p - t * r);
    f.m_position.x += f.m_invMass * b;
    f.m_position.y += f.m_invMass * a;
    f.m_rotation += f.m_invI * (d * a - c * b);
    g.m_R.Set(g.m_rotation);
    f.m_R.Set(f.m_rotation);
    if (this.m_limitState1 == b2Joint.e_atUpperLimit) {
        j = g.m_R;
        u = j.col1.x * this.m_localAnchor1.x + j.col2.x * this.m_localAnchor1.y;
        t = j.col1.y * this.m_localAnchor1.x + j.col2.y * this.m_localAnchor1.y;
        r = g.m_position.x + u;
        p = g.m_position.y + t;
        this.m_u1.Set(r - k, p - i);
        n = this.m_u1.Length();
        if (n > b2Settings.b2_linearSlop) {
            this.m_u1.x *= 1 / n;
            this.m_u1.y *= 1 / n
        } else {
            this.m_u1.SetZero()
        }
        l = this.m_maxLength1 - n;
        e = b2Math.b2Max(e, -l);
        l = b2Math.b2Clamp(l + b2Settings.b2_linearSlop, -b2Settings.b2_maxLinearCorrection, 0);
        h = -this.m_limitMass1 * l;
        s = this.m_limitPositionImpulse1;
        this.m_limitPositionImpulse1 = b2Math.b2Max(0, this.m_limitPositionImpulse1 + h);
        h = this.m_limitPositionImpulse1 - s;
        r = -h * this.m_u1.x;
        p = -h * this.m_u1.y;
        g.m_position.x += g.m_invMass * r;
        g.m_position.y += g.m_invMass * p;
        g.m_rotation += g.m_invI * (u * p - t * r);
        g.m_R.Set(g.m_rotation)
    }
    if (this.m_limitState2 == b2Joint.e_atUpperLimit) {
        j = f.m_R;
        d = j.col1.x * this.m_localAnchor2.x + j.col2.x * this.m_localAnchor2.y;
        c = j.col1.y * this.m_localAnchor2.x + j.col2.y * this.m_localAnchor2.y;
        b = f.m_position.x + d;
        a = f.m_position.y + c;
        this.m_u2.Set(b - q, a - o);
        m = this.m_u2.Length();
        if (m > b2Settings.b2_linearSlop) {
            this.m_u2.x *= 1 / m;
            this.m_u2.y *= 1 / m
        } else {
            this.m_u2.SetZero()
        }
        l = this.m_maxLength2 - m;
        e = b2Math.b2Max(e, -l);
        l = b2Math.b2Clamp(l + b2Settings.b2_linearSlop, -b2Settings.b2_maxLinearCorrection, 0);
        h = -this.m_limitMass2 * l;
        s = this.m_limitPositionImpulse2;
        this.m_limitPositionImpulse2 = b2Math.b2Max(0, this.m_limitPositionImpulse2 + h);
        h = this.m_limitPositionImpulse2 - s;
        b = -h * this.m_u2.x;
        a = -h * this.m_u2.y;
        f.m_position.x += f.m_invMass * b;
        f.m_position.y += f.m_invMass * a;
        f.m_rotation += f.m_invI * (d * a - c * b);
        f.m_R.Set(f.m_rotation)
    }
    return e < b2Settings.b2_linearSlop
},m_ground:null,m_groundAnchor1:new b2Vec2(),m_groundAnchor2:new b2Vec2(),m_localAnchor1:new b2Vec2(),m_localAnchor2:new b2Vec2(),m_u1:new b2Vec2(),m_u2:new b2Vec2(),m_constant:null,m_ratio:null,m_maxLength1:null,m_maxLength2:null,m_pulleyMass:null,m_limitMass1:null,m_limitMass2:null,m_pulleyImpulse:null,m_limitImpulse1:null,m_limitImpulse2:null,m_limitPositionImpulse1:null,m_limitPositionImpulse2:null,m_limitState1:0,m_limitState2:0});
b2PulleyJoint.b2_minPulleyLength = b2Settings.b2_lengthUnitsPerMeter;
var b2PulleyJointDef = function() {
    this.type = b2Joint.e_unknownJoint;
    this.userData = null;
    this.body1 = null;
    this.body2 = null;
    this.collideConnected = false;
    this.groundPoint1 = new b2Vec2();
    this.groundPoint2 = new b2Vec2();
    this.anchorPoint1 = new b2Vec2();
    this.anchorPoint2 = new b2Vec2();
    this.type = b2Joint.e_pulleyJoint;
    this.groundPoint1.Set(-1, 1);
    this.groundPoint2.Set(1, 1);
    this.anchorPoint1.Set(-1, 0);
    this.anchorPoint2.Set(1, 0);
    this.maxLength1 = 0.5 * b2PulleyJoint.b2_minPulleyLength;
    this.maxLength2 = 0.5 * b2PulleyJoint.b2_minPulleyLength;
    this.ratio = 1;
    this.collideConnected = true
};
Object.extend(b2PulleyJointDef.prototype, b2JointDef.prototype);
Object.extend(b2PulleyJointDef.prototype, {groundPoint1:new b2Vec2(),groundPoint2:new b2Vec2(),anchorPoint1:new b2Vec2(),anchorPoint2:new b2Vec2(),maxLength1:null,maxLength2:null,ratio:null});
var b2RevoluteJoint = function(c) {
    this.m_node1 = new b2JointNode();
    this.m_node2 = new b2JointNode();
    this.m_type = c.type;
    this.m_prev = null;
    this.m_next = null;
    this.m_body1 = c.body1;
    this.m_body2 = c.body2;
    this.m_collideConnected = c.collideConnected;
    this.m_islandFlag = false;
    this.m_userData = c.userData;
    this.K = new b2Mat22();
    this.K1 = new b2Mat22();
    this.K2 = new b2Mat22();
    this.K3 = new b2Mat22();
    this.m_localAnchor1 = new b2Vec2();
    this.m_localAnchor2 = new b2Vec2();
    this.m_ptpImpulse = new b2Vec2();
    this.m_ptpMass = new b2Mat22();
    var b;
    var a;
    var d;
    b = this.m_body1.m_R;
    a = c.anchorPoint.x - this.m_body1.m_position.x;
    d = c.anchorPoint.y - this.m_body1.m_position.y;
    this.m_localAnchor1.x = a * b.col1.x + d * b.col1.y;
    this.m_localAnchor1.y = a * b.col2.x + d * b.col2.y;
    b = this.m_body2.m_R;
    a = c.anchorPoint.x - this.m_body2.m_position.x;
    d = c.anchorPoint.y - this.m_body2.m_position.y;
    this.m_localAnchor2.x = a * b.col1.x + d * b.col1.y;
    this.m_localAnchor2.y = a * b.col2.x + d * b.col2.y;
    this.m_intialAngle = this.m_body2.m_rotation - this.m_body1.m_rotation;
    this.m_ptpImpulse.Set(0, 0);
    this.m_motorImpulse = 0;
    this.m_limitImpulse = 0;
    this.m_limitPositionImpulse = 0;
    this.m_lowerAngle = c.lowerAngle;
    this.m_upperAngle = c.upperAngle;
    this.m_maxMotorTorque = c.motorTorque;
    this.m_motorSpeed = c.motorSpeed;
    this.m_enableLimit = c.enableLimit;
    this.m_enableMotor = c.enableMotor;
    this.anchor1Coord = this.m_localAnchor1.Copy();
    this.anchor2Coord = this.m_localAnchor2.Copy()
};
Object.extend(b2RevoluteJoint.prototype, b2Joint.prototype);
Object.extend(b2RevoluteJoint.prototype, {anchor1Coord:null,anchor2Coord:null,GetAnchor1:function() {
    var a = this.m_body1;
    var b = a.m_R;
    this.anchor1Coord.x = a.m_position.x + (b.col1.x * this.m_localAnchor1.x + b.col2.x * this.m_localAnchor1.y);
    this.anchor1Coord.y = a.m_position.y + (b.col1.y * this.m_localAnchor1.x + b.col2.y * this.m_localAnchor1.y);
    return this.anchor1Coord
},GetAnchor2:function() {
    var a = this.m_body2;
    var b = a.m_R;
    this.anchor2Coord.x = a.m_position.x + (b.col1.x * this.m_localAnchor2.x + b.col2.x * this.m_localAnchor2.y);
    this.anchor2Coord.y = a.m_position.y + (b.col1.y * this.m_localAnchor2.x + b.col2.y * this.m_localAnchor2.y);
    return this.anchor2Coord
},GetJointAngle:function() {
    return this.m_body2.m_rotation - this.m_body1.m_rotation
},GetJointSpeed:function() {
    return this.m_body2.m_angularVelocity - this.m_body1.m_angularVelocity
},GetMotorTorque:function(a) {
    return a * this.m_motorImpulse
},SetMotorSpeed:function(a) {
    this.m_motorSpeed = a
},SetMotorTorque:function(a) {
    this.m_maxMotorTorque = a
},GetReactionForce:function(a) {
    var b = this.m_ptpImpulse.Copy();
    b.Multiply(a);
    return b
},GetReactionTorque:function(a) {
    return a * this.m_limitImpulse
},K:new b2Mat22(),K1:new b2Mat22(),K2:new b2Mat22(),K3:new b2Mat22(),PrepareVelocitySolver:function() {
    var h = this.m_body1;
    var g = this.m_body2;
    var f;
    f = h.m_R;
    var k = f.col1.x * this.m_localAnchor1.x + f.col2.x * this.m_localAnchor1.y;
    var i = f.col1.y * this.m_localAnchor1.x + f.col2.y * this.m_localAnchor1.y;
    f = g.m_R;
    var e = f.col1.x * this.m_localAnchor2.x + f.col2.x * this.m_localAnchor2.y;
    var d = f.col1.y * this.m_localAnchor2.x + f.col2.y * this.m_localAnchor2.y;
    var l = h.m_invMass;
    var j = g.m_invMass;
    var c = h.m_invI;
    var b = g.m_invI;
    this.K1.col1.x = l + j;
    this.K1.col2.x = 0;
    this.K1.col1.y = 0;
    this.K1.col2.y = l + j;
    this.K2.col1.x = c * i * i;
    this.K2.col2.x = -c * k * i;
    this.K2.col1.y = -c * k * i;
    this.K2.col2.y = c * k * k;
    this.K3.col1.x = b * d * d;
    this.K3.col2.x = -b * e * d;
    this.K3.col1.y = -b * e * d;
    this.K3.col2.y = b * e * e;
    this.K.SetM(this.K1);
    this.K.AddM(this.K2);
    this.K.AddM(this.K3);
    this.K.Invert(this.m_ptpMass);
    this.m_motorMass = 1 / (c + b);
    if (this.m_enableMotor == false) {
        this.m_motorImpulse = 0
    }
    if (this.m_enableLimit) {
        var a = g.m_rotation - h.m_rotation - this.m_intialAngle;
        if (b2Math.b2Abs(this.m_upperAngle - this.m_lowerAngle) < 2 * b2Settings.b2_angularSlop) {
            this.m_limitState = b2Joint.e_equalLimits
        } else {
            if (a <= this.m_lowerAngle) {
                if (this.m_limitState != b2Joint.e_atLowerLimit) {
                    this.m_limitImpulse = 0
                }
                this.m_limitState = b2Joint.e_atLowerLimit
            } else {
                if (a >= this.m_upperAngle) {
                    if (this.m_limitState != b2Joint.e_atUpperLimit) {
                        this.m_limitImpulse = 0
                    }
                    this.m_limitState = b2Joint.e_atUpperLimit
                } else {
                    this.m_limitState = b2Joint.e_inactiveLimit;
                    this.m_limitImpulse = 0
                }
            }
        }
    } else {
        this.m_limitImpulse = 0
    }
    if (b2World.s_enableWarmStarting) {
        h.m_linearVelocity.x -= l * this.m_ptpImpulse.x;
        h.m_linearVelocity.y -= l * this.m_ptpImpulse.y;
        h.m_angularVelocity -= c * ((k * this.m_ptpImpulse.y - i * this.m_ptpImpulse.x) + this.m_motorImpulse + this.m_limitImpulse);
        g.m_linearVelocity.x += j * this.m_ptpImpulse.x;
        g.m_linearVelocity.y += j * this.m_ptpImpulse.y;
        g.m_angularVelocity += b * ((e * this.m_ptpImpulse.y - d * this.m_ptpImpulse.x) + this.m_motorImpulse + this.m_limitImpulse)
    } else {
        this.m_ptpImpulse.SetZero();
        this.m_motorImpulse = 0;
        this.m_limitImpulse = 0
    }
    this.m_limitPositionImpulse = 0
},SolveVelocityConstraints:function(f) {
    var g = this.m_body1;
    var e = this.m_body2;
    var i;
    i = g.m_R;
    var o = i.col1.x * this.m_localAnchor1.x + i.col2.x * this.m_localAnchor1.y;
    var n = i.col1.y * this.m_localAnchor1.x + i.col2.y * this.m_localAnchor1.y;
    i = e.m_R;
    var b = i.col1.x * this.m_localAnchor2.x + i.col2.x * this.m_localAnchor2.y;
    var a = i.col1.y * this.m_localAnchor2.x + i.col2.y * this.m_localAnchor2.y;
    var k;
    var q = e.m_linearVelocity.x + (-e.m_angularVelocity * a) - g.m_linearVelocity.x - (-g.m_angularVelocity * n);
    var p = e.m_linearVelocity.y + (e.m_angularVelocity * b) - g.m_linearVelocity.y - (g.m_angularVelocity * o);
    var m = -(this.m_ptpMass.col1.x * q + this.m_ptpMass.col2.x * p);
    var l = -(this.m_ptpMass.col1.y * q + this.m_ptpMass.col2.y * p);
    this.m_ptpImpulse.x += m;
    this.m_ptpImpulse.y += l;
    g.m_linearVelocity.x -= g.m_invMass * m;
    g.m_linearVelocity.y -= g.m_invMass * l;
    g.m_angularVelocity -= g.m_invI * (o * l - n * m);
    e.m_linearVelocity.x += e.m_invMass * m;
    e.m_linearVelocity.y += e.m_invMass * l;
    e.m_angularVelocity += e.m_invI * (b * l - a * m);
    if (this.m_enableMotor && this.m_limitState != b2Joint.e_equalLimits) {
        var r = e.m_angularVelocity - g.m_angularVelocity - this.m_motorSpeed;
        var c = -this.m_motorMass * r;
        var d = this.m_motorImpulse;
        this.m_motorImpulse = b2Math.b2Clamp(this.m_motorImpulse + c, -f.dt * this.m_maxMotorTorque, f.dt * this.m_maxMotorTorque);
        c = this.m_motorImpulse - d;
        g.m_angularVelocity -= g.m_invI * c;
        e.m_angularVelocity += e.m_invI * c
    }
    if (this.m_enableLimit && this.m_limitState != b2Joint.e_inactiveLimit) {
        var h = e.m_angularVelocity - g.m_angularVelocity;
        var j = -this.m_motorMass * h;
        if (this.m_limitState == b2Joint.e_equalLimits) {
            this.m_limitImpulse += j
        } else {
            if (this.m_limitState == b2Joint.e_atLowerLimit) {
                k = this.m_limitImpulse;
                this.m_limitImpulse = b2Math.b2Max(this.m_limitImpulse + j, 0);
                j = this.m_limitImpulse - k
            } else {
                if (this.m_limitState == b2Joint.e_atUpperLimit) {
                    k = this.m_limitImpulse;
                    this.m_limitImpulse = b2Math.b2Min(this.m_limitImpulse + j, 0);
                    j = this.m_limitImpulse - k
                }
            }
        }
        g.m_angularVelocity -= g.m_invI * j;
        e.m_angularVelocity += e.m_invI * j
    }
},SolvePositionConstraints:function() {
    var s;
    var m;
    var l = this.m_body1;
    var k = this.m_body2;
    var o = 0;
    var n;
    n = l.m_R;
    var y = n.col1.x * this.m_localAnchor1.x + n.col2.x * this.m_localAnchor1.y;
    var x = n.col1.y * this.m_localAnchor1.x + n.col2.y * this.m_localAnchor1.y;
    n = k.m_R;
    var f = n.col1.x * this.m_localAnchor2.x + n.col2.x * this.m_localAnchor2.y;
    var e = n.col1.y * this.m_localAnchor2.x + n.col2.y * this.m_localAnchor2.y;
    var u = l.m_position.x + y;
    var t = l.m_position.y + x;
    var d = k.m_position.x + f;
    var c = k.m_position.y + e;
    var j = d - u;
    var i = c - t;
    o = Math.sqrt(j * j + i * i);
    var q = l.m_invMass;
    var p = k.m_invMass;
    var h = l.m_invI;
    var g = k.m_invI;
    this.K1.col1.x = q + p;
    this.K1.col2.x = 0;
    this.K1.col1.y = 0;
    this.K1.col2.y = q + p;
    this.K2.col1.x = h * x * x;
    this.K2.col2.x = -h * y * x;
    this.K2.col1.y = -h * y * x;
    this.K2.col2.y = h * y * y;
    this.K3.col1.x = g * e * e;
    this.K3.col2.x = -g * f * e;
    this.K3.col1.y = -g * f * e;
    this.K3.col2.y = g * f * f;
    this.K.SetM(this.K1);
    this.K.AddM(this.K2);
    this.K.AddM(this.K3);
    this.K.Solve(b2RevoluteJoint.tImpulse, -j, -i);
    var b = b2RevoluteJoint.tImpulse.x;
    var a = b2RevoluteJoint.tImpulse.y;
    l.m_position.x -= l.m_invMass * b;
    l.m_position.y -= l.m_invMass * a;
    l.m_rotation -= l.m_invI * (y * a - x * b);
    l.m_R.Set(l.m_rotation);
    k.m_position.x += k.m_invMass * b;
    k.m_position.y += k.m_invMass * a;
    k.m_rotation += k.m_invI * (f * a - e * b);
    k.m_R.Set(k.m_rotation);
    var w = 0;
    if (this.m_enableLimit && this.m_limitState != b2Joint.e_inactiveLimit) {
        var v = k.m_rotation - l.m_rotation - this.m_intialAngle;
        var r = 0;
        if (this.m_limitState == b2Joint.e_equalLimits) {
            m = b2Math.b2Clamp(v, -b2Settings.b2_maxAngularCorrection, b2Settings.b2_maxAngularCorrection);
            r = -this.m_motorMass * m;
            w = b2Math.b2Abs(m)
        } else {
            if (this.m_limitState == b2Joint.e_atLowerLimit) {
                m = v - this.m_lowerAngle;
                w = b2Math.b2Max(0, -m);
                m = b2Math.b2Clamp(m + b2Settings.b2_angularSlop, -b2Settings.b2_maxAngularCorrection, 0);
                r = -this.m_motorMass * m;
                s = this.m_limitPositionImpulse;
                this.m_limitPositionImpulse = b2Math.b2Max(this.m_limitPositionImpulse + r, 0);
                r = this.m_limitPositionImpulse - s
            } else {
                if (this.m_limitState == b2Joint.e_atUpperLimit) {
                    m = v - this.m_upperAngle;
                    w = b2Math.b2Max(0, m);
                    m = b2Math.b2Clamp(m - b2Settings.b2_angularSlop, 0, b2Settings.b2_maxAngularCorrection);
                    r = -this.m_motorMass * m;
                    s = this.m_limitPositionImpulse;
                    this.m_limitPositionImpulse = b2Math.b2Min(this.m_limitPositionImpulse + r, 0);
                    r = this.m_limitPositionImpulse - s
                }
            }
        }
        l.m_rotation -= l.m_invI * r;
        l.m_R.Set(l.m_rotation);
        k.m_rotation += k.m_invI * r;
        k.m_R.Set(k.m_rotation)
    }
    return o <= b2Settings.b2_linearSlop && w <= b2Settings.b2_angularSlop
},m_localAnchor1:new b2Vec2(),m_localAnchor2:new b2Vec2(),m_ptpImpulse:new b2Vec2(),m_motorImpulse:null,m_limitImpulse:null,m_limitPositionImpulse:null,m_ptpMass:new b2Mat22(),m_motorMass:null,m_intialAngle:null,m_lowerAngle:null,m_upperAngle:null,m_maxMotorTorque:null,m_motorSpeed:null,m_enableLimit:null,m_enableMotor:null,m_limitState:0});
b2RevoluteJoint.tImpulse = new b2Vec2();
var b2RevoluteJointDef = function() {
    this.type = b2Joint.e_unknownJoint;
    this.userData = null;
    this.body1 = null;
    this.body2 = null;
    this.collideConnected = false;
    this.type = b2Joint.e_revoluteJoint;
    this.anchorPoint = new b2Vec2(0, 0);
    this.lowerAngle = 0;
    this.upperAngle = 0;
    this.motorTorque = 0;
    this.motorSpeed = 0;
    this.enableLimit = false;
    this.enableMotor = false
};
Object.extend(b2RevoluteJointDef.prototype, b2JointDef.prototype);
Object.extend(b2RevoluteJointDef.prototype, {anchorPoint:null,lowerAngle:null,upperAngle:null,motorTorque:null,motorSpeed:null,enableLimit:null,enableMotor:null});
var b2SpringJoint = function(c) {
    this.m_node1 = new b2JointNode();
    this.m_node2 = new b2JointNode();
    this.m_type = c.type;
    this.m_prev = null;
    this.m_next = null;
    this.m_body1 = c.body1;
    this.m_body2 = c.body2;
    this.m_collideConnected = c.collideConnected;
    this.m_islandFlag = false;
    this.m_userData = c.userData;
    this.m_strength = c.strength;
    this.m_decay = 1;
    this.m_localAnchor1 = new b2Vec2();
    this.m_localAnchor2 = new b2Vec2();
    this.m_worldAnchor1 = new b2Vec2();
    this.m_worldAnchor2 = new b2Vec2();
    this.m_diff = new b2Vec2();
    var b;
    var a;
    var d;
    b = this.m_body1.m_R;
    a = c.anchorPoint1.x - this.m_body1.m_position.x;
    d = c.anchorPoint1.y - this.m_body1.m_position.y;
    this.m_localAnchor1.x = a * b.col1.x + d * b.col1.y;
    this.m_localAnchor1.y = a * b.col2.x + d * b.col2.y;
    b = this.m_body2.m_R;
    a = c.anchorPoint2.x - this.m_body2.m_position.x;
    d = c.anchorPoint2.y - this.m_body2.m_position.y;
    this.m_localAnchor2.x = a * b.col1.x + d * b.col1.y;
    this.m_localAnchor2.y = a * b.col2.x + d * b.col2.y;
    a = c.anchorPoint2.x - c.anchorPoint1.x;
    d = c.anchorPoint2.y - c.anchorPoint1.y;
    this.m_length = Math.sqrt(a * a + d * d);
    this.previousLength = this.m_length
};
Object.extend(b2SpringJoint.prototype, b2Joint.prototype);
Object.extend(b2SpringJoint.prototype, {PrepareVelocitySolver:function() {
    var c = this.m_worldAnchor1,b = this.m_worldAnchor2;
    c.SetV(this.m_localAnchor1);
    c.MulM(this.m_body1.m_R);
    c.Add(this.m_body1.m_position);
    b.SetV(this.m_localAnchor2);
    b.MulM(this.m_body2.m_R);
    b.Add(this.m_body2.m_position);
    var d = this.m_diff;
    d.SetV(b);
    d.Subtract(c);
    var a = d.Length();
    if (a > this.m_length) {
        if (a > this.previousLength) {
            d.Multiply(this.m_strength);
            decay = 1
        } else {
            decay = Math.sqrt(decay);
            d.Multiply(this.m_strength * decay)
        }
        this.previousLength = a;
        if (d.Length() > 2) {
            this.m_body1.ApplyImpulse(d, c);
            this.m_body2.ApplyImpulse(d.Negative(), b)
        }
    }
},SolveVelocityConstraints:function(a) {
},SolvePositionConstraints:function() {
},GetReactionForce:function(a) {
    var b = new b2Vec2(0, 0);
    return b
},GetReactionTorque:function(a) {
    return 0
},GetAnchor1:function() {
    return this.m_localAnchor1
},GetAnchor2:function() {
    return this.m_localAnchor2
},m_localAnchor1:null,m_localAnchor2:null,m_worldAnchor1:null,m_worldAnchor2:null,m_diff:null,m_length:null,m_strength:0});
var b2SpringJointDef = function(c, b, a) {
    this.type = b2Joint.e_springJoint;
    this.userData = null;
    this.body1 = c;
    this.body2 = b;
    this.collideConnected = true;
    this.anchorPoint1 = new b2Vec2();
    this.anchorPoint2 = new b2Vec2();
    this.strength = a
};
Object.extend(b2SpringJointDef.prototype, b2JointDef.prototype);
Object.extend(b2SpringJointDef.prototype, {initialize:function(c, b, a) {
    this.type = b2Joint.e_springJoint;
    this.userData = null;
    this.body1 = c;
    this.body2 = b;
    this.collideConnected = true;
    this.anchorPoint1 = new b2Vec2();
    this.anchorPoint2 = new b2Vec2();
    this.strength = a
},anchorPoint1:null,anchorPoint2:null,strength:0});
