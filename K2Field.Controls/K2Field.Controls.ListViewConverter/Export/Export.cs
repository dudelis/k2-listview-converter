using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;

namespace K2Field.Controls.ListViewConverter.Export
{
    public class Export
    {
        private Dictionary<AvailableFormat, IExportFormatFactory> factories = 
            new Dictionary<AvailableFormat, IExportFormatFactory>();

        public Export()
        {
            foreach (AvailableFormat format in Enum.GetValues(typeof(AvailableFormat)))
            {
                var factory = (IExportFormatFactory) Activator.CreateInstance(Type.GetType(
                    "K2Field.Controls.ListViewConverter.Export." + Enum.GetName(typeof(AvailableFormat), format) +
                    "Factory"));
                factories.Add(format, factory);
            }
        }

        public IExportFormat ExportFormat(AvailableFormat format, DataTable dt)
        {
            return factories[format].Export(dt);
        }
    }
}
